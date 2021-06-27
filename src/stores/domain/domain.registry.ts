import { Registry } from '@stores/helpers/registry/registry';
import { Lifecycle } from 'tsyringe';
import { CounterStore } from './counter/counter.store';

export const domainRegistry = Registry.make().add({
    token: CounterStore,
    useClass: CounterStore,
    options: { lifecycle: Lifecycle.Singleton }
});
