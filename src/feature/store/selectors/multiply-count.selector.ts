import { CounterState } from '../../../stores/counter/counter.types';
import { SelectorInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { Selector } from '../../../stores/helpers/stores.types';
import { RootSelectorParams } from '../../../stores/root/root.types';

export class MultiplyCount implements Selector {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    static make({ store, props }: RootSelectorParams): MultiplyCount {
        return new MultiplyCount(store.counter, props);
    }

    constructor(private store: CounterState, private props: number = 1) {}

    get result(): number {
        MultiplyCount.runs += 1;
        return this.store.$count * this.props;
    }
}

export const MultiplyCountSelector = SelectorInteractionBuilder.make(
    MultiplyCount
);
