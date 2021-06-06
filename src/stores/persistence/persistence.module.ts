import { Registration } from '@stores/helpers/store.types';
import { Lifecycle } from 'tsyringe';
import { CounterSourceStore } from './counter-source/counter-source.store';
import { COUNTER_SOURCE_STORE } from './counter-source/counter-source.tokens';

export const persistenceModule: Registration[] = [
    {
        token: COUNTER_SOURCE_STORE,
        useClass: CounterSourceStore,
        options: { lifecycle: Lifecycle.Singleton }
    }
];
