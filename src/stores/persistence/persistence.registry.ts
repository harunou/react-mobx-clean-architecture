import { Registry } from '@stores/helpers/registry/registry';
import { Lifecycle } from 'tsyringe';
import { CounterSourceStore } from './counter-source/counter-source.store';
import { COUNTER_SOURCE_STORE } from './counter-source/counter-source.tokens';

export const persistenceRegistry = Registry.make().add(
    COUNTER_SOURCE_STORE,
    { useClass: CounterSourceStore },
    { lifecycle: Lifecycle.Singleton }
);
