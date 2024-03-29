import { runInAction } from 'mobx';
import type { UseCase } from 'src/@types';
import { noop } from 'src/utils';
import type { OrderEntityCollection, OrdersGateway, OrdersAggregate } from '../../types';

type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'replaceAllFromDto'>;
type OrdersGatewayDep = Pick<OrdersGateway, 'fetchOrders'>;

export class PollingOrdersUseCase implements UseCase {
    static make(store: OrdersAggregate): UseCase {
        return new PollingOrdersUseCase(store.orderModelCollection, store.ordersGateway);
    }
    constructor(
        private orderModelCollection: OrderEntityCollectionDep,
        private ordersGateway: OrdersGatewayDep,
    ) {}

    async execute(): Promise<void> {
        try {
            const orders = await this.ordersGateway.fetchOrders();
            runInAction(() => {
                this.orderModelCollection.replaceAllFromDto(orders);
            });
        } catch (error) {
            noop();
        }
    }
}
