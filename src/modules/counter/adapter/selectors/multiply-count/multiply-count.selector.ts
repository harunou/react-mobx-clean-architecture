import { COUNTER_STORE } from '@stores/domain/counter/counter.tokens';
import { CounterState } from '@stores/domain/counter/counter.types';
import { SelectorWithProps } from '@stores/helpers/store/store.types';
import { inject, injectable } from 'tsyringe';

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
