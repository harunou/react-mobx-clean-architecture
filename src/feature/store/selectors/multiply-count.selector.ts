import { CounterState } from '../../../stores/counter/counter.types';
import { SelectorInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { Selector } from '../../../stores/helpers/stores.types';
import { RootSelectorParams } from '../../../stores/root/root.types';

export class MultiplyCount implements Selector {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    static make({ store, params }: RootSelectorParams): MultiplyCount {
        return new MultiplyCount(store.counter, params);
    }

    constructor(private store: CounterState, private params: number = 1) {}

    get result(): number {
        MultiplyCount.runs += 1;
        return this.store.$count * this.params;
    }
}

export const MultiplyCountSelector = SelectorInteractionBuilder.make(
    MultiplyCount
);
