import { action, makeObservable } from 'mobx';
import type { ObservableState, UseCase } from 'src/@types';
import type { AbstractOrdersStore } from 'src/modules/orders/types';
import { DeleteItemByIdUseCase } from 'src/modules/orders/useCases';

export class OrderItemController {
    static make(
        ordersStore: AbstractOrdersStore,
        orderIdStore: ObservableState<string>,
        itemIdStore: ObservableState<string>,
    ): OrderItemController {
        return new OrderItemController(
            orderIdStore,
            itemIdStore,
            DeleteItemByIdUseCase.make(ordersStore),
        );
    }

    constructor(
        private readonly orderIdStore: ObservableState<string>,
        private readonly itemIdStore: ObservableState<string>,
        private readonly deleteItemByIdUseCase: UseCase<[orderId: string, itemId: string]>,
    ) {
        makeObservable(this);
    }

    @action.bound
    deleteButtonClicked(): void {
        void this.deleteItemByIdUseCase.execute(this.orderIdStore.value, this.itemIdStore.value);
    }
}
