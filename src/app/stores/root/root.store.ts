import { DomainStore } from '../domain/domain.store';
import { DomainModel, DomainState } from '../domain/domain.types';
import {
    Builder,
    QueryResponse,
    Selector,
    StoreFacade,
    UseCase
} from '../stores.types';

export class RootStore implements StoreFacade<DomainModel> {
    static make(init: DomainState): RootStore {
        const domain = new DomainStore(init);
        return new RootStore(domain);
    }

    constructor(private domain: DomainModel) {}

    query(selector: Builder<DomainState, Selector>): QueryResponse {
        return selector.build(this.domain);
    }

    execute(useCase: Builder<DomainModel, UseCase>): void {
        useCase.build(this.domain).execute();
    }
}