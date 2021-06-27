import { CounterState } from '@stores/domain/counter/counter.types';
import { SelectorWithProps } from '@stores/helpers/store.types';
import { computed, makeObservable } from 'mobx';
import { injectable } from 'tsyringe';

@injectable()
export class MultiplyCountSelector implements SelectorWithProps {
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
