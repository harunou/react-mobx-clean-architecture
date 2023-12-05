import { runInAction } from 'mobx';
import type { UseCase } from 'src/@types';
import { noop } from 'src/utils';
import type { OrderEntityCollection, OrdersGateway, AbstractOrdersStore } from '../../types';

type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'replaceAllFromDto'>;
type OrdersGatewayDep = Pick<OrdersGateway, 'fetchOrders'>;

export class PollingOrdersUseCase implements UseCase {
    static make(store: AbstractOrdersStore): UseCase {
        return new PollingOrdersUseCase(store.orderEntityCollection, store.ordersGateway);
    }
    constructor(
        private orderEntityCollection: OrderEntityCollectionDep,
        private ordersGateway: OrdersGatewayDep,
    ) {}

    async execute(): Promise<void> {
        try {
            const orders = await this.ordersGateway.fetchOrders();
            runInAction(() => {
                this.orderEntityCollection.replaceAllFromDto(orders);
            });
        } catch (error) {
            noop();
        }
    }
}
