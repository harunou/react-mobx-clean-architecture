import { DomainModel, DomainState } from '@stores/domain/domain-store.types';
import { PersistenceModel } from '@stores/persistence/persistence-store.types';

export interface RootState {
    domain: DomainState;
}

export interface RootModel {
    domain: DomainModel;
    persistence: PersistenceModel;
}
