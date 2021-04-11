import { DomainModel, DomainState } from '../domain/domain.types';
import { StoreExecuter, StoreQuery } from '../helpers/stores.types';
import { PersistenceModel } from '../persistence/persistence.types';

export type RootStoreQuery = StoreQuery<DomainState>;
export type RootStoreExecutor = StoreExecuter<DomainModel, PersistenceModel>;
