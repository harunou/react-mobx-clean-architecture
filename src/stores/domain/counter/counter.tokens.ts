import { makeInjectionToken } from '@stores/helpers/store.helpers';
import { CounterStore } from './counter.store';
import { CounterState } from './counter.types';

export const COUNTER_INITIAL_STATE = makeInjectionToken<CounterState>(
    'COUNTER_INITIAL_STATE'
);
export const COUNTER_STORE = makeInjectionToken<CounterStore>('COUNTER_STORE');
