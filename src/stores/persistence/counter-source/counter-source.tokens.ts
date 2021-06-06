import { makeInjectionToken } from '@stores/helpers/store.helpers';
import { CounterSourceStore } from './counter-source.store';

export const COUNTER_SOURCE_STORE = makeInjectionToken<CounterSourceStore>(
    'COUNTER_SOURCE_STORE'
);
