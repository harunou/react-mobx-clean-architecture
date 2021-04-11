import { CounterState } from '../../../stores/counter/counter.types';
import { DomainState } from '../../../stores/domain/domain.types';
import { SelectorInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { Selector } from '../../../stores/helpers/stores.types';

export class MultiplyCount implements Selector {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    static make(store: DomainState, params: number): MultiplyCount {
        return new MultiplyCount(store.counter, params);
    }

    constructor(private store: CounterState, private params: number) {}

    get result(): number {
        MultiplyCount.runs += 1;
        return this.store.$count * this.params;
    }
}

export const MultiplyCountSelector = SelectorInteractionBuilder.make(
    MultiplyCount
);
