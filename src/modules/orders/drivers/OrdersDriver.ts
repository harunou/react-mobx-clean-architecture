import type { UseCase } from 'src/@types';
import type { AbstractOrdersStore } from 'src/modules/orders/types';
import { PollingOrdersUseCase } from 'src/modules/orders/useCases';

const DELAY_POLLING_REQUESTS_SEC = 10;

export class OrdersDriver {
    static make(store: AbstractOrdersStore): OrdersDriver {
        return new OrdersDriver(PollingOrdersUseCase.make(store));
    }
    #delayTimer: NodeJS.Timer | undefined = undefined;
    #pollingOrdersAction: UseCase;

    constructor(pollingOrdersAction: UseCase) {
        this.#pollingOrdersAction = pollingOrdersAction;
    }

    startPollingOrders(): void {
        void this.#pollOrders();
    }

    stopPollingOrders(): void {
        clearTimeout(this.#delayTimer);
    }

    async #pollOrders(): Promise<void> {
        clearTimeout(this.#delayTimer);
        await this.#pollingOrdersAction.execute();
        this.#delayTimer = setTimeout(() => {
            void this.#pollOrders();
        }, DELAY_POLLING_REQUESTS_SEC * 1000);
    }
}
