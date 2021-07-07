import { CounterSourceStore } from './counter-source/counter-source-store';

export class PersistenceStore {
    static make(): PersistenceStore {
        const counterSourceStore = CounterSourceStore.make();
        return new PersistenceStore(counterSourceStore);
    }

    constructor(public readonly counterSource: CounterSourceStore) {}
}
