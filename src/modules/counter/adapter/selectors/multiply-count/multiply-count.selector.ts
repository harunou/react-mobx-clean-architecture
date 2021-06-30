import { CounterState } from '@stores/domain/counter/counter.types';
import { computed, makeObservable } from 'mobx';

export class MultiplyCountSelector {
    #factor = 1;

    constructor(private store: CounterState) {
        makeObservable(this, {
            result: computed
        });
    }

    withProps(factor: number): this {
        this.#factor = factor;
        return this;
    }

    get result(): number {
        return this.store.count$ * this.#factor;
    }
}
