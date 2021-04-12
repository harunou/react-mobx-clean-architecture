import { DomainModel, DomainState } from '@stores/domain/domain.types';
import {
    SelectorParams,
    StoreQuery
} from '@stores/helpers/selector/selector.types';
import {
    StoreExecuter,
    UseCaseParams
} from '@stores/helpers/usecase/usecase.types';
import { PersistenceModel } from '@stores/persistence/persistence.types';

export type RootStoreQuery = StoreQuery<DomainState>;
export type RootStoreExecutor = StoreExecuter<DomainModel, PersistenceModel>;
export type RootUseCaseParams<P = unknown> = UseCaseParams<
    DomainModel,
    PersistenceModel,
    P
>;
export type RootSelectorParams<P = unknown> = SelectorParams<DomainState, P>;
