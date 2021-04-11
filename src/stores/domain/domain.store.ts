import { CounterStore } from '../counter/counter.store';
import { CounterModel } from '../counter/counter.types';
import { DomainModel, DomainState } from './domain.types';

export class DomainStore implements DomainModel {
    static make(state: DomainState): DomainStore {
        const counter = new CounterStore(state.counter);
        return new DomainStore(counter);
    }

    constructor(public counter: CounterModel) {}
}
