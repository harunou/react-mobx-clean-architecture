import { noop } from '@core/core.helpers';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { action } from 'mobx/dist/internal';

export const incrementCounterAction = action(
    (value: number, stores: { counter: CounterModel }) => {
        stores.counter.increment(value);
    }
);

export const incrementCounterSuccessAction = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.increment(value)
);

export const incrementCounterFailureAction = action((error: Error) =>
    noop(error)
);

export const saveCounterFailureAction = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.decrement(value)
);

export const getCounterSuccessAction = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);
