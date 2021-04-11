import { configure } from 'mobx';
import { DomainStore } from '../domain/domain.store';
import { DomainModel, DomainState } from '../domain/domain.types';
import {
    Selector,
    SelectorBuilder,
    UseCaseBuilder
} from '../helpers/stores.types';
import { PersistenceStore } from '../persistence/persistence.store';
import { PersistenceModel } from '../persistence/persistence.types';
import { StoreFacade } from './root.types';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export class RootStore implements StoreFacade<DomainModel, PersistenceModel> {
    static make(initial: DomainState): RootStore {
        const domain = DomainStore.make(initial);
        const persistence = PersistenceStore.make();

        return new RootStore(domain, persistence);
    }

    constructor(
        private domain: DomainModel,
        private persistence: PersistenceModel
    ) {}

    query(selector: SelectorBuilder<DomainState>): Selector {
        return selector.build(this.domain);
    }

    execute(useCase: UseCaseBuilder<DomainModel, PersistenceModel>): void {
        useCase.build(this.domain, this.persistence).execute();
    }
}
