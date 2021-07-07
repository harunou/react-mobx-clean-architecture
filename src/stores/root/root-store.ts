import { DomainStore } from '@stores/domain/domain-store';
import { PersistenceStore } from '@stores/persistence/persistence-store';
import { configure } from 'mobx';
import { RootModel } from './root-store.types';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export class RootStore implements RootModel {
    static make(): RootStore {
        const domainStore = DomainStore.make();
        const persistenceStore = PersistenceStore.make();
        return new RootStore(domainStore, persistenceStore);
    }

    constructor(
        public readonly domain: DomainStore,
        public readonly persistence: PersistenceStore
    ) {}
}
