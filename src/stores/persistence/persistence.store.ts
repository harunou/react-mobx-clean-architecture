import { COUNTER_REMOTE_SERVICE } from '@api/counter.service';
import {
    container,
    inject,
    injectable,
    InjectionToken,
    Lifecycle
} from 'tsyringe';
import { CounterSource } from './counter-source.types';
import { PersistenceModel } from './persistence.types';

@injectable()
export class PersistenceStore implements PersistenceModel {
    constructor(
        @inject(COUNTER_REMOTE_SERVICE)
        public counterRemoteService: CounterSource
    ) {}
}

export const PERSISTENCE_STORE: InjectionToken<PersistenceStore> = Symbol(
    'PERSISTENCE_STORE'
);

container.register(
    PERSISTENCE_STORE,
    { useClass: PersistenceStore },
    { lifecycle: Lifecycle.Singleton }
);
