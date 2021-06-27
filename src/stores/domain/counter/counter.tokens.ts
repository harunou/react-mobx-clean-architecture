import { makeInjectionToken } from '@stores/helpers/store.helpers';
import { CounterState } from './counter.types';

export const COUNTER_INITIAL_STATE = makeInjectionToken<CounterState>(
    'COUNTER_INITIAL_STATE'
);
