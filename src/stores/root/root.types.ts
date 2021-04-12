import { DomainModel, DomainState } from '../domain/domain.types';
import {
    SelectorMakeParams,
    StoreExecuter,
    StoreQuery,
    UseCaseMakeParams
} from '../stores.types';
import { PersistenceModel } from '../persistence/persistence.types';

export type RootStoreQuery = StoreQuery<DomainState>;
export type RootStoreExecutor = StoreExecuter<DomainModel, PersistenceModel>;
export type RootUseCaseParams<P = unknown> = UseCaseMakeParams<
    DomainModel,
    PersistenceModel,
    P
>;
export type RootSelectorParams<P = unknown> = SelectorMakeParams<
    DomainState,
    P
>;