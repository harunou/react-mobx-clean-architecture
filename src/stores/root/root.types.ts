import { DomainModel, DomainState } from '../domain/domain.types';
import {
    SelectorMakeParams,
    StoreExecuter,
    StoreQuery,
    UseCaseMakeParams
} from '../helpers/stores.types';
import { PersistenceModel } from '../persistence/persistence.types';

export type RootStoreQuery = StoreQuery<DomainState>;
export type RootStoreExecutor = StoreExecuter<DomainModel, PersistenceModel>;
export type RootUseCaseParams = UseCaseMakeParams<
    DomainModel,
    PersistenceModel
>;
export type RootSelectorParams<P> = SelectorMakeParams<DomainState, P>;
