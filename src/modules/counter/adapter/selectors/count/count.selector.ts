import { CounterState } from '@stores/domain/counter/counter.types';
import { computed, makeObservable } from 'mobx';

export class CountSelector {
    constructor(private store: CounterState) {
        makeObservable(this, {
            result: computed
        });
    }

    get result(): number {
        return this.store.count$;
    }
}
