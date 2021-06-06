import { configure } from 'mobx';
import {
    container,
    inject,
    injectable,
    InjectionToken,
    Lifecycle
} from 'tsyringe';
import { APP_STORE } from '../app/app.store';
import { AppModel } from '../app/app.types';
import { PERSISTENCE_STORE } from '../persistence/persistence.store';
import { PersistenceModel } from '../persistence/persistence.types';
import { RootModel } from './root.types';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

@injectable()
export class RootStore implements RootModel {
    constructor(
        @inject(APP_STORE) public appStore: AppModel,
        @inject(PERSISTENCE_STORE) public persistenceStore: PersistenceModel
    ) {}
}

export const ROOT_STORE: InjectionToken<RootStore> = Symbol('ROOT_STORE');

container.register(
    ROOT_STORE,
    { useClass: RootStore },
    { lifecycle: Lifecycle.Singleton }
);
