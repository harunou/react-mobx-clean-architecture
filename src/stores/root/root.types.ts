import { AppModel, AppState } from '@stores/app/app.types';
import { PersistenceModel } from '@stores/persistence/persistence.types';

export interface RootModel {
    appStore: AppModel;
    persistenceStore: PersistenceModel;
}

export interface RootState {
    appStore: AppState;
}
