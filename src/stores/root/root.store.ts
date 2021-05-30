import { noop } from '@core/core.helpers';
import { makeContext } from '@stores/helpers/context/context.helpers';
import { configure } from 'mobx';
import {
    container,
    inject,
    injectable,
    InjectionToken,
    Lifecycle
} from 'tsyringe';
import { APP_MODEL } from '../app/app.store';
import { AppModel, AppState } from '../app/app.types';
import { Store } from '../helpers/store/store.helpers';
import {
    PersistenceStore,
    PERSISTENCE_MODEL
} from '../persistence/persistence.store';
import { PersistenceModel } from '../persistence/persistence.types';
import { RootModel, RootState } from './root.types';

export class RootStoreLegacy extends Store<AppModel, PersistenceModel> {
    static make(initial: AppState): RootStoreLegacy {
        configure({
            enforceActions: 'always',
            computedRequiresReaction: true,
            reactionRequiresObservable: true,
            observableRequiresReaction: true,
            disableErrorBoundaries: false
        });

        noop(initial);

        const appStore = container.resolve(APP_MODEL);
        const persistenceStore = container.resolve(PersistenceStore);

        return new RootStoreLegacy(appStore, persistenceStore);
    }
}

export const { RootStoreContext, useAdapter } = makeContext<RootStoreLegacy>();

@injectable()
export class RootStore {
    constructor(
        @inject(APP_MODEL) public appStore: AppModel,
        @inject(PERSISTENCE_MODEL) public persistenceStore: PersistenceModel
    ) {}
}

export const ROOT_MODEL: InjectionToken<RootModel> = Symbol('ROOT_MODEL');
export const ROOT_STATE: InjectionToken<RootState> = Symbol('ROOT_STATE');

container.register(
    ROOT_MODEL,
    { useClass: PersistenceStore },
    { lifecycle: Lifecycle.Singleton }
);

container.registerType(ROOT_STATE, ROOT_MODEL);
