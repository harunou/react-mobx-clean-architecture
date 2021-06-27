import { apiRegistry } from '@api/api.registry';
import { Registry } from '@stores/helpers/registry/registry';
import { CounterSourceStore } from './counter-source/counter-source.store';
import { CounterSource } from './counter-source/counter-source.types';

export const persistenceRegistry = Registry.make()
    .addSingleton(CounterSourceStore)
    .addAlias(CounterSource, CounterSourceStore)
    .merge(apiRegistry);
