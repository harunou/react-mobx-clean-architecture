import { configure } from 'mobx';
import { DomainStore } from '../domainStore/domainStore';
import { DomainModel, DomainState } from '../domainStore/domainStore.types';
import {
    Selector,
    SelectorBuilder,
    UseCaseBuilder
} from '../helpers/stores.types';
import { PersistenceStore } from '../persistenceStore/persistenceStore';
import { PersistenceModel } from '../persistenceStore/persistenceStore.types';
import { StoreFacade } from './appStore.types';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export class AppStore implements StoreFacade<DomainModel, PersistenceModel> {
    static make(init: DomainState): AppStore {
        const domain = DomainStore.make(init);
        const persistence = PersistenceStore.make();

        return new AppStore(domain, persistence);
    }

    constructor(
        private domain: DomainModel,
        private persistence: PersistenceStore
    ) {}

    query(selector: SelectorBuilder<DomainState>): Selector {
        return selector.build(this.domain);
    }

    execute(useCase: UseCaseBuilder<DomainModel, PersistenceModel>): void {
        useCase.build(this.domain, this.persistence).execute();
    }
}
