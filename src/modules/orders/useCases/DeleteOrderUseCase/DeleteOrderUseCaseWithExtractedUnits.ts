import { action } from 'mobx';
import type { Effect, Transaction, UseCase } from 'src/@types';
import { DeleteOrderEffect } from '../../effects';
import { DeleteOrderTransaction } from '../../transactions';
import type {
    OrderEntityCollection,
    OrdersPresentationEntity,
    OrdersAggregate,
    ServiceGateway,
} from '../../types';

export type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'remove' | 'models'>;
export type OrdersPresentationEntityDep = Pick<OrdersPresentationEntity, 'patchData'>;
export type ServiceGatewayDep = Pick<ServiceGateway, 'logOrders'>;
export type DeleteOrderEffectDep = Effect<[string]>;
export type DeleteOrderTransactionDep = Transaction<[string]>;

export class DeleteOrderUseCase implements UseCase<[string]> {
    static make(ordersStore: OrdersAggregate): UseCase<[string]> {
        return new DeleteOrderUseCase(
            ordersStore.orderModelCollection,
            ordersStore.ordersPresentationModel,
            ordersStore.serviceGateway,
            DeleteOrderEffect.make(ordersStore),
            DeleteOrderTransaction.make(ordersStore),
        );
    }
    constructor(
        private orderModelCollection: OrderEntityCollectionDep,
        private ordersPresentationModel: OrdersPresentationEntityDep,
        private serviceGateway: ServiceGatewayDep,
        private deleteOrderEffect: DeleteOrderEffectDep,
        private deleteOrderTransaction: DeleteOrderTransactionDep,
    ) {}

    @action
    async execute(id: string): Promise<void> {
        this.ordersPresentationModel.patchData({ isLoading: true });
        try {
            await this.deleteOrderEffect.run(id);

            this.successTransaction(id);
            void this.serviceGateway.logOrders(this.orderModelCollection.models);
        } catch (error: unknown) {
            this.failureTransaction();
        }
    }

    @action
    private successTransaction(id: string): void {
        this.deleteOrderTransaction.commit(id);
        this.ordersPresentationModel.patchData({ isLoading: false });
    }

    @action
    private failureTransaction(): void {
        this.ordersPresentationModel.patchData({ isLoading: false });
    }
}
