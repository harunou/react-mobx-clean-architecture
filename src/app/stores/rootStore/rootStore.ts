import { DomainStore } from '../domainStore/domainStore';
import { DomainModel, DomainState } from '../domainStore/domainStore.types';
import { Builder, Selector, UseCase } from '../helpers/stores.types';
import { QueryResponse, StoreFacade } from './rootStore.types';

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
