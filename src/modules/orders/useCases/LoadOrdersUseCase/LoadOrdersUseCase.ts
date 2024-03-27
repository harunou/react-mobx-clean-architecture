import { action } from 'mobx';
import type { UseCase } from 'src/@types';
import { isAbortError, makeCancelEffect } from 'src/utils';
import type {
    OrderEntityCollection,
    OrderEntityDto,
    OrdersGateway,
    OrdersPresentationEntity,
    OrdersAggregate,
    AbstractOrdersCancelEffects,
} from '../../types';

export type OrdersPresentationEntityDep = Pick<OrdersPresentationEntity, 'patchData'>;
export type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'replaceAllFromDto'>;
export type OrdersGatewayDep = Pick<OrdersGateway, 'fetchOrders'>;

export class LoadOrdersUseCase implements UseCase {
    static make(ordersStore: OrdersAggregate): UseCase {
        return new LoadOrdersUseCase(
            ordersStore.orderEntityCollection,
            ordersStore.ordersPresentationEntity,
            ordersStore.ordersCancelEffects,
            ordersStore.ordersGateway,
        );
    }
    constructor(
        private orderEntityCollection: OrderEntityCollectionDep,
        private ordersPresentation: OrdersPresentationEntityDep,
        private ordersCancelEffects: AbstractOrdersCancelEffects,
        private ordersGateway: OrdersGatewayDep,
    ) {}

    @action
    async execute(): Promise<void> {
        this.ordersCancelEffects.cancelFetchOrders();
        const fetchOrdersCancelEffect = makeCancelEffect();
        this.ordersCancelEffects.addFetchOrders(fetchOrdersCancelEffect.cancelEffect);
        try {
            this.ordersPresentation.patchData({ isLoading: true });

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
        this.orderEntityCollection.replaceAllFromDto(orders);
        this.ordersPresentation.patchData({ isLoading: false });
    }

    @action
    private failureTransaction(): void {
        this.ordersPresentation.patchData({ isLoading: false });
    }

    @action
    private abortedTransaction(): void {
        this.ordersPresentation.patchData({ isLoading: false });
    }
}
