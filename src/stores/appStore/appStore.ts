import { configure } from 'mobx';
import { DomainStore } from '../domain/domain.store';
import { Domain, DomainState } from '../domain/domain.types';
import {
    Selector,
    SelectorBuilder,
    UseCaseBuilder
} from '../helpers/stores.types';
import { PersistenceStore } from '../persistenceStore/persistenceStore';
import { Persistence } from '../persistenceStore/persistenceStore.types';
import { StoreFacade } from './appStore.types';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export class AppStore implements StoreFacade<Domain, Persistence> {
    static make(init: DomainState): AppStore {
        const domain = DomainStore.make(init);
        const persistence = PersistenceStore.make();

        return new AppStore(domain, persistence);
    }

    constructor(private domain: Domain, private persistence: Persistence) {}

    query(selector: SelectorBuilder<DomainState>): Selector {
        return selector.build(this.domain);
    }

    execute(useCase: UseCaseBuilder<Domain, Persistence>): void {
        useCase.build(this.domain, this.persistence).execute();
    }
}
