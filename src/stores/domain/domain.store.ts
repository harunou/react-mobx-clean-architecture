import { CounterStore } from './counter/counter.store';
import { DomainModel } from './domain.types';

export class DomainStore implements DomainModel {
    static make(): DomainStore {
        const counterStore = CounterStore.make();
        return new DomainStore(counterStore);
    }
    constructor(public readonly counter: CounterStore) {}
}
