import { CounterState } from '@stores/counter/counter.types';
import { SelectorWithProps } from '@stores/helpers/store/store.types';
import { COUNTER_STORE } from '@stores/root/root.store';
import { container, inject, injectable, InjectionToken } from 'tsyringe';

@injectable()
export class MultiplyCountSelector implements SelectorWithProps {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    #factor = 1;

    constructor(@inject(COUNTER_STORE) private store: CounterState) {}

    withProps(factor: number): this {
        this.#factor = factor;
        return this;
    }

    get result(): number {
        MultiplyCountSelector.runs += 1;
        return this.store.count$ * this.#factor;
    }
}

export const MULTIPLY_COUNT_SELECTOR: InjectionToken<SelectorWithProps> = Symbol(
    'MULTIPLY_COUNT_SELECTOR'
);

container.register(MULTIPLY_COUNT_SELECTOR, {
    useClass: MultiplyCountSelector
});
