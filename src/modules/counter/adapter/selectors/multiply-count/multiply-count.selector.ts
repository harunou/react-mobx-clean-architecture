import { CounterState } from '@stores/counter/counter.types';
import { SelectorWithProps } from '@stores/helpers/store/store.types';

export class MultiplyCountSelector implements SelectorWithProps {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    #factor = 1;

    constructor(private store: CounterState) {}

    withProps(factor: number): this {
        this.#factor = factor;
        return this;
    }

    get result(): number {
        MultiplyCountSelector.runs += 1;
        return this.store.$count * this.#factor;
    }
}
