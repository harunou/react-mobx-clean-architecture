import { CounterModel } from '@stores/domain/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/stores.helpers';
import { action } from 'mobx';

export const incrementCounterRequested = action(
    (value: number, stores: { counter: CounterModel }) => {
        stores.counter.increment(value);
    }
);

export const incrementCounterSuccess = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);

export const incrementCounterFailure = action((error: Error) => {
    if (error.message === FLOW_CANCELLED) {
        return;
    }
    throw error;
});

export const saveCounterFailure = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.decrement(value)
);

export const getCounterSuccess = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);

export const getCounterFailure = action((error: Error) => {
    if (error.message === FLOW_CANCELLED) {
        return;
    }
    throw error;
});
