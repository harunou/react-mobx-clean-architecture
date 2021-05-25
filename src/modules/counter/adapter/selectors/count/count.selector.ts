import { CounterState } from '@stores/counter/counter.types';
import { Selector } from '@stores/helpers/store/store.types';

export class CountSelector implements Selector {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    constructor(private store: CounterState) {}

    get result(): number {
        CountSelector.runs += 1;
        return this.store.$count;
    }
}
