import { Registry } from '@stores/helpers/registry/registry';
import { CounterStore } from './counter/counter.store';

export const domainRegistry = Registry.make().addSingleton(CounterStore);
