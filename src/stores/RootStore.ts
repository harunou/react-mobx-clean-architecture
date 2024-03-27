import type { OrdersAggregate } from 'src/modules/orders/types';
import type { RootAggregate, RootAggregateDto } from 'src/types';

export class RootStore implements RootAggregate {
    static make(): RootAggregate {
        return new RootStore();
    }

    ordersStore: OrdersAggregate | undefined = undefined;

    get dto(): RootAggregateDto {
        return {
            ordersStoreDto: this.ordersStore?.dto,
        };
    }

    setData(data: RootAggregateDto): void {
        if (data.ordersStoreDto !== undefined) {
            this.ordersStore?.setData(data.ordersStoreDto);
        }
    }

    patchData(data: Partial<RootAggregateDto>): void {
        if (data.ordersStoreDto !== undefined) {
            this.ordersStore?.patchData(data.ordersStoreDto);
        }
    }

    setOrdersStore(OrdersStore: OrdersAggregate | undefined): void {
        this.ordersStore = OrdersStore;
    }
}
