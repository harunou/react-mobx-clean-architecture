import { DomainState } from '../../../stores/domainStore/domainStore.types';
import { SelectorInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { Selector } from '../../../stores/helpers/stores.types';

export class Multiply implements Selector {
    // NOTE(harunou): for testing purposes
    static runs = 0;

    static make(store: DomainState, params: number): Multiply {
        return new Multiply(store, params);
    }

    constructor(private store: DomainState, private params: number) {}

    get result(): number {
        Multiply.runs += 1;
        return this.store.$count * this.params;
    }
}

export const MultiplySelector = SelectorInteractionBuilder.make(Multiply);
