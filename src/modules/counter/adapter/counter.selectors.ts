import { CounterState } from '@stores/domain/counter/counter.types';
import { computed, IComputedValue } from 'mobx';

// Selector contains application specific selection logic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selector = <R, Args extends any[]>(
    fn: (...args: Args) => R
): ((...args: Args) => IComputedValue<R>) => {
    return (...args: Args): IComputedValue<R> => computed(() => fn(...args));
};

export const countSelector = selector(
    (stores: { counter: CounterState }) => stores.counter.count$
);

export const countMultiplySelector = selector(
    (factor: number, stores: { counter: CounterState }) =>
        stores.counter.count$ * factor
);
