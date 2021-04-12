import { configure } from 'mobx';
import { DomainStore } from '../domain/domain.store';
import { DomainModel, DomainState } from '../domain/domain.types';
import { Store } from '../helpers/stores.helpers';
import { PersistenceStore } from '../persistence/persistence.store';
import { PersistenceModel } from '../persistence/persistence.types';

export class RootStore extends Store<DomainModel, PersistenceModel> {
    static make(initial: DomainState): RootStore {
        configure({
            enforceActions: 'always',
            computedRequiresReaction: true,
            reactionRequiresObservable: true,
            observableRequiresReaction: true,
            disableErrorBoundaries: false
        });

        const domainStore = DomainStore.make(initial);
        const persistenceStore = PersistenceStore.make();

        return new RootStore(domainStore, persistenceStore);
    }
}
