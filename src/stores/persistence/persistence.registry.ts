import { apiRegistry } from '@api/api.registry';
import { Registry } from '@stores/helpers/registry/registry';
import { CounterSourceStore } from './counter-source/counter-source.store';

export const persistenceRegistry = Registry.make()
    .addSingleton(CounterSourceStore)
    .merge(apiRegistry);
