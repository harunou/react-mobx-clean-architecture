import { AppModel, AppState } from '@stores/app/app.types';
import { EffectMakeParams } from '@stores/helpers/effect/effect.types';
import { SelectorMakeParams } from '@stores/helpers/selector/selector.types';
import { StoreExecuter, StoreQuery } from '@stores/helpers/store/store.types';
import { UseCaseMakeParams } from '@stores/helpers/usecase/usecase.types';
import { PersistenceModel } from '@stores/persistence/persistence.types';

export type RootStoreQuery = StoreQuery<AppState>;
export type RootStoreExecutor = StoreExecuter<AppModel, PersistenceModel>;
export type RootUseCaseMakeParams<P = unknown> = UseCaseMakeParams<
    AppModel,
    PersistenceModel,
    P
>;
export type RootSelectorMakeParams<P = unknown> = SelectorMakeParams<
    AppState,
    P
>;
export type RootEffectMakeParams = EffectMakeParams<AppModel, PersistenceModel>;

export interface RootModel {
    appStore: AppModel;
    persistenceStore: PersistenceModel;
}

export interface RootState {
    appStore: AppState;
}
