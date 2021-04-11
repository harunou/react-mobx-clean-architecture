import { configure } from 'mobx';
import { DomainStore } from '../domain/domain.store';
import { DomainModel, DomainState } from '../domain/domain.types';
import { AppStore } from '../helpers/stores.helpers';
import { PersistenceStore } from '../persistence/persistence.store';
import { PersistenceModel } from '../persistence/persistence.types';

export class RootStore extends AppStore<DomainModel, PersistenceModel> {
    static make(initial: DomainState): RootStore {
        configure({
            enforceActions: 'always',
            computedRequiresReaction: true,
            reactionRequiresObservable: true,
            observableRequiresReaction: true,
            disableErrorBoundaries: false
        });

        const domain = DomainStore.make(initial);
        const persistence = PersistenceStore.make();

        return new RootStore(domain, persistence);
    }
}
