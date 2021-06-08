import { Registry } from '@stores/helpers/registry/registry';
import { Lifecycle } from 'tsyringe';
import { CounterStore } from './counter/counter.store';
import { COUNTER_INITIAL_STATE, COUNTER_STORE } from './counter/counter.tokens';
import { CounterState } from './counter/counter.types';

export const COUNTER_INITIAL_VALUE: CounterState = { count$: 0 };

export const domainRegistry = Registry.make()
    .add(COUNTER_INITIAL_STATE, {
        useValue: COUNTER_INITIAL_VALUE
    })
    .add(
        COUNTER_STORE,
        { useClass: CounterStore },
        { lifecycle: Lifecycle.Singleton }
    );
