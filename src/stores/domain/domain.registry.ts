import { Registry } from '@stores/helpers/registry/registry';
import { CounterStore } from './counter/counter.store';
import { CounterModel, CounterState } from './counter/counter.types';

export const domainRegistry = Registry.make()
    .addSingleton(CounterStore)
    .addAlias(CounterState, CounterStore)
    .addAlias(CounterModel, CounterStore);
