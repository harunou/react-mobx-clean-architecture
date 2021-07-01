import { CounterState } from '@stores/domain/counter/counter.types';
import { computed, IComputedValue } from 'mobx';

type Computed<T> = IComputedValue<T>;

// Selector contains application specific selection logic
export const countSelector = (counter: CounterState): Computed<number> =>
    computed(() => counter.count$);

export const countMultiplySelector = (
    counter: CounterState,
    factor: number
): Computed<number> => computed(() => counter.count$ * factor);
