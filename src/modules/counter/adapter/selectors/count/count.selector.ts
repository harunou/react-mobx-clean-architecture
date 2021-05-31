import { COUNTER_STORE } from '@stores/counter/counter.store';
import { CounterState } from '@stores/counter/counter.types';
import { Selector } from '@stores/helpers/store/store.types';
import { container, inject, injectable, InjectionToken } from 'tsyringe';

@injectable()
export class CountSelector implements Selector {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    constructor(@inject(COUNTER_STORE) private store: CounterState) {}

    get result(): number {
        CountSelector.runs += 1;
        return this.store.count$;
    }
}

export const COUNT_SELECTOR: InjectionToken<Selector> = Symbol(
    'COUNT_SELECTOR'
);

container.register(COUNT_SELECTOR, { useClass: CountSelector });
