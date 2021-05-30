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

export const PERSISTENCE_MODEL: InjectionToken<PersistenceModel> = Symbol(
    'PERSISTENCE_MODEL'
);

container.register(
    PERSISTENCE_MODEL,
    { useClass: PersistenceStore },
    { lifecycle: Lifecycle.Singleton }
);
