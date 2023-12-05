import type { AbstractOrdersStore } from 'src/modules/orders/types';
import type { AbstractRootStore, AbstractRootStoreDto } from 'src/types';

export class RootStore implements AbstractRootStore {
    static make(): AbstractRootStore {
        return new RootStore();
    }

    ordersStore: AbstractOrdersStore | undefined = undefined;

    get dto(): AbstractRootStoreDto {
        return {
            ordersStoreDto: this.ordersStore?.dto,
        };
    }

    setData(data: AbstractRootStoreDto): void {
        if (data.ordersStoreDto !== undefined) {
            this.ordersStore?.setData(data.ordersStoreDto);
        }
    }

    patchData(data: Partial<AbstractRootStoreDto>): void {
        if (data.ordersStoreDto !== undefined) {
            this.ordersStore?.patchData(data.ordersStoreDto);
        }
    }

    setOrdersStore(OrdersStore: AbstractOrdersStore | undefined): void {
        this.ordersStore = OrdersStore;
    }
}
