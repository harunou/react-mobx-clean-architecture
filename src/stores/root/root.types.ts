import { DomainModel, DomainState } from '@stores/domain/domain.types';
import { PersistenceModel } from '@stores/persistence/persistence.types';

export interface RootState {
    domain: DomainState;
}

export interface RootModel {
    domain: DomainModel;
    persistence: PersistenceModel;
}
