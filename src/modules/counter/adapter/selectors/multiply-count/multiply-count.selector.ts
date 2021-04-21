import { CounterState } from '@stores/counter/counter.types';
import { SelectorBuilder } from '@stores/helpers/selector/selector.helpers';
import { Selector } from '@stores/helpers/store/store.types';
import { RootSelectorMakeParams } from '@stores/root/root.types';

export class MultiplyCount implements Selector {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    static make({
        store,
        props
    }: RootSelectorMakeParams<number>): MultiplyCount {
        return new MultiplyCount(store.counter, props);
    }

    constructor(private store: CounterState, private factor: number = 1) {}

    get result(): number {
        MultiplyCount.runs += 1;
        return this.store.$count * this.factor;
    }
}

export const multiplyCountSelector = SelectorBuilder.make(MultiplyCount);
