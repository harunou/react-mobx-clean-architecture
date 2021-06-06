import { Registration } from '@stores/helpers/store.types';
import { Lifecycle } from 'tsyringe';
import { CounterStore } from './counter/counter.store';
import { COUNTER_INITIAL_STATE, COUNTER_STORE } from './counter/counter.tokens';
import { CounterState } from './counter/counter.types';

export const COUNTER_INITIAL_VALUE: CounterState = { count$: 0 };

export const domainModule: Registration[] = [
    {
        token: COUNTER_INITIAL_STATE,
        useValue: COUNTER_INITIAL_VALUE
    },
    {
        token: COUNTER_STORE,
        useClass: CounterStore,
        options: { lifecycle: Lifecycle.Singleton }
    }
];
