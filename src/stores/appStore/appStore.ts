import { configure } from 'mobx';
import { DomainStore } from '../domainStore/domainStore';
import { DomainModel, DomainState } from '../domainStore/domainStore.types';
import { Builder, Selector, UseCase } from '../helpers/stores.types';
import { PersistenceStore } from '../persistenceStore/persistenceStore';
import { QueryResponse, StoreFacade } from './appStore.types';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export class RootStore implements StoreFacade<DomainModel> {
    static make(init: DomainState): RootStore {
        const domain = DomainStore.make(init);
        const persistence = PersistenceStore.make();

        return new RootStore(domain, persistence);
    }

    constructor(
        private domain: DomainModel,
        private persistence: PersistenceStore
    ) {}

    query(selector: Builder<DomainState, Selector>): QueryResponse {
        return selector.build(this.domain);
    }

    execute(useCase: Builder<DomainModel, UseCase>): void {
        useCase.build(this.domain).execute();
    }
}
