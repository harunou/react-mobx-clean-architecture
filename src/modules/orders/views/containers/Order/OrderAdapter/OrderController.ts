import { action, makeObservable } from 'mobx';
import type { ObservableState, UseCase } from 'src/@types';
import type { AbstractOrdersStore } from 'src/modules/orders/types';
import { DeleteOrderUseCase } from 'src/modules/orders/useCases';

export class OrderController {
    static make(
        ordersStore: AbstractOrdersStore,
        orderIdStore: ObservableState<string>,
    ): OrderController {
        return new OrderController(orderIdStore, DeleteOrderUseCase.make(ordersStore));
    }

    constructor(
        private readonly orderIdStore: ObservableState<string>,
        private readonly deleteOrderUseCase: UseCase<[string]>,
    ) {
        makeObservable(this);
    }

    @action.bound
    deleteOrderButtonClicked(): void {
        void this.deleteOrderUseCase.execute(this.orderIdStore.value);
    }
}
