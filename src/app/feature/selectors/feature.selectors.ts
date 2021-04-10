import { DomainState } from '../../stores/domainStore/domainStore.types';
import { InteractionBuilder } from '../../stores/helpers/stores.helpers';
import { Selector } from '../../stores/helpers/stores.types';

let selectorRuns = 0;

export class Multiply implements Selector {
    static make(store: DomainState, params: number): Multiply {
        return new Multiply(store, params);
    }
    static get runs(): number {
        return selectorRuns;
    }

    constructor(private store: DomainState, private params: number) {}

    get result(): number {
        selectorRuns += 1;
        return this.store.$count * this.params;
    }
}

export const MultiplySelector = InteractionBuilder.make(Multiply);
