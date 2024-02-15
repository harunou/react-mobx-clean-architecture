import { action } from 'mobx';
import type { UseCase } from 'src/@types';
import type {
    OrderEntityCollection,
    OrdersPresentationEntity,
    AbstractOrdersStore,
    ServiceGateway,
    OrdersGateway,
} from '../../types';

export type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'remove' | 'entities'>;
export type OrdersPresentationEntityDep = Pick<OrdersPresentationEntity, 'patchData'>;
export type ServiceGatewayDep = Pick<ServiceGateway, 'logOrders'>;
export type OrdersGatewayDep = Pick<OrdersGateway, 'deleteOrder'>;

export class DeleteOrderUseCase implements UseCase<[string]> {
    static make(ordersStore: AbstractOrdersStore): UseCase<[string]> {
        return new DeleteOrderUseCase(
            ordersStore.orderEntityCollection,
            ordersStore.ordersPresentationEntity,
            ordersStore.serviceGateway,
            ordersStore.ordersGateway,
        );
    }
    constructor(
        private orderEntityCollection: OrderEntityCollectionDep,
        private ordersPresentation: OrdersPresentationEntityDep,
        private serviceGateway: ServiceGatewayDep,
        private ordersGateway: OrdersGatewayDep,
    ) {}

    @action
    async execute(id: string): Promise<void> {
        this.ordersPresentation.patchData({ isLoading: true });
        try {
            await this.deleteOrderEffect(id);

            this.successTransaction(id);
            void this.serviceGateway.logOrders(this.orderEntityCollection.entities);
        } catch (error: unknown) {
            this.failureTransaction();
        }
    }

    private deleteOrderEffect(id: string): Promise<void> {
        return this.ordersGateway.deleteOrder(id);
    }

    @action
    private successTransaction(id: string): void {
        this.deleteOrderTransaction(id);
        this.ordersPresentation.patchData({ isLoading: false });
    }

    @action
    private failureTransaction(): void {
        this.ordersPresentation.patchData({ isLoading: false });
    }

    @action
    private deleteOrderTransaction(id: string): void {
        this.orderEntityCollection.remove(id);
    }
}
