import { CounterState } from '@stores/counter/counter.types';
import { SelectorBuilder } from '@stores/helpers/selector/selector.helpers';
import { Selector } from '@stores/helpers/selector/selector.types';
import { RootSelectorParams } from '@stores/root/root.types';

export class Count implements Selector {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    static make({ store }: RootSelectorParams): Count {
        return new Count(store.counter);
    }

    constructor(private store: CounterState) {}

    get result(): number {
        Count.runs += 1;
        return this.store.$count;
    }
}

export const countSelector = SelectorBuilder.make(Count);
