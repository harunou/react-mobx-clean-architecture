import { DomainState } from '../../../stores/domainStore/domainStore.types';
import { SelectorInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { Selector } from '../../../stores/helpers/stores.types';

let selectorRuns = 0;

export class Multiply implements Selector {
    static make(store: DomainState, params: number): Multiply {
        return new Multiply(store, params);
    }
    // NOTE(harunou): for testing purposes
    static get runs(): number {
        return selectorRuns;
    }
    static set runs(v: number) {
        selectorRuns = v;
    }

    constructor(private store: DomainState, private params: number) {}

    get result(): number {
        selectorRuns += 1;
        return this.store.$count * this.params;
    }
}

export const MultiplySelector = SelectorInteractionBuilder.make(Multiply);
