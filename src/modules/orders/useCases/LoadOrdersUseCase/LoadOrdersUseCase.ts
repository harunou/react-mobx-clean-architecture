import { action } from 'mobx';
import type { UseCase } from 'src/@types';
import { isAbortError, makeCancelEffect } from 'src/utils';
import type {
    OrderEntityCollection,
    OrderEntityDto,
    OrdersGateway,
    OrdersPresentationEntity,
    OrdersAggregate,
    OrdersCancelEffectCollection,
} from '../../types';

export type OrdersPresentationEntityDep = Pick<OrdersPresentationEntity, 'patchData'>;
export type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'replaceAllFromDto'>;
export type OrdersGatewayDep = Pick<OrdersGateway, 'fetchOrders'>;

export class LoadOrdersUseCase implements UseCase {
    static make(ordersStore: OrdersAggregate): UseCase {
        return new LoadOrdersUseCase(
            ordersStore.orderModelCollection,
            ordersStore.ordersPresentationModel,
            ordersStore.ordersCancelEffects,
            ordersStore.ordersGateway,
        );
    }
    constructor(
        private orderModelCollection: OrderEntityCollectionDep,
        private ordersPresentationModel: OrdersPresentationEntityDep,
        private ordersCancelEffects: OrdersCancelEffectCollection,
        private ordersGateway: OrdersGatewayDep,
    ) {}

    @action
    async execute(): Promise<void> {
        this.ordersCancelEffects.cancelFetchOrders();
        const fetchOrdersCancelEffect = makeCancelEffect();
        this.ordersCancelEffects.addFetchOrders(fetchOrdersCancelEffect.cancelEffect);
        try {
            this.ordersPresentationModel.patchData({ isLoading: true });

            const orders = await this.ordersGateway.fetchOrders({
                signal: fetchOrdersCancelEffect.abortController.signal,
            });

            this.successTransaction(orders);
        } catch (e) {
            if (isAbortError(e)) {
                this.abortedTransaction();
                return;
            }
            this.failureTransaction();
        } finally {
            this.ordersCancelEffects.removeFetchOrders();
        }
    }

    @action
    private successTransaction(orders: OrderEntityDto[]): void {
        this.orderModelCollection.replaceAllFromDto(orders);
        this.ordersPresentationModel.patchData({ isLoading: false });
    }

    @action
    private failureTransaction(): void {
        this.ordersPresentationModel.patchData({ isLoading: false });
    }

    @action
    private abortedTransaction(): void {
        this.ordersPresentationModel.patchData({ isLoading: false });
    }
}
