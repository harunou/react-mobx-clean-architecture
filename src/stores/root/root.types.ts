import { AppModel, AppState } from '@stores/app/app.types';
import { EffectParams } from '@stores/helpers/effect/effect.types';
import {
    SelectorParams,
    StoreQuery
} from '@stores/helpers/selector/selector.types';
import {
    StoreExecuter,
    UseCaseParams
} from '@stores/helpers/usecase/usecase.types';
import { PersistenceModel } from '@stores/persistence/persistence.types';

export type RootStoreQuery = StoreQuery<AppState>;
export type RootStoreExecutor = StoreExecuter<AppModel, PersistenceModel>;
export type RootUseCaseParams<P = unknown> = UseCaseParams<
    AppModel,
    PersistenceModel,
    P
>;
export type RootSelectorParams<P = unknown> = SelectorParams<AppState, P>;
export type RootEffectParams = EffectParams<AppModel, PersistenceModel>;
