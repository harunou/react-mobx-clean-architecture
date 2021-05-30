import { noop } from '@core/core.helpers';
import { makeContext } from '@stores/helpers/context/context.helpers';
import { configure } from 'mobx';
import { container } from 'tsyringe';
import { APP_MODEL } from '../app/app.store';
import { AppModel, AppState } from '../app/app.types';
import { Store } from '../helpers/store/store.helpers';
import { PersistenceStore } from '../persistence/persistence.store';
import { PersistenceModel } from '../persistence/persistence.types';

export class RootStore extends Store<AppModel, PersistenceModel> {
    static make(initial: AppState): RootStore {
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

        return new RootStore(appStore, persistenceStore);
    }
}

export const { RootStoreContext, useAdapter } = makeContext<RootStore>();
