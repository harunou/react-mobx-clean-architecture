import { Registry } from '@stores/helpers/registry/registry';
import { Lifecycle } from 'tsyringe';
import { CounterStore, COUNTER_INITIAL_VALUE } from './counter/counter.store';
import { COUNTER_INITIAL_STATE, COUNTER_STORE } from './counter/counter.tokens';

export const domainRegistry = Registry.make()
    .add({
        token: COUNTER_INITIAL_STATE,
        useValue: COUNTER_INITIAL_VALUE
    })
    .add({
        token: COUNTER_STORE,
        useClass: CounterStore,
        options: { lifecycle: Lifecycle.Singleton }
    });
