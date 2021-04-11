import { DomainModel, DomainState } from '../domain/domain.types';
import {
    SelectorMakeParams,
    StoreExecuter,
    StoreQuery,
    UseCaseMakeParams
} from '../helpers/stores.types';
import { PersistenceModel } from '../persistence/persistence.types';

export type AppStoreQuery = StoreQuery<DomainState>;
export type AppStoreExecutor = StoreExecuter<DomainModel, PersistenceModel>;
export type AppUseCaseParams<P = undefined> = UseCaseMakeParams<
    DomainModel,
    PersistenceModel,
    P
>;
export type AppSelectorParams<P> = SelectorMakeParams<DomainState, P>;
