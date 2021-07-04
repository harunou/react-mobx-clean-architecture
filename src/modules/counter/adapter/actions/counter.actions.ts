import { CounterModel } from '@stores/domain/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/stores.helpers';
import { action } from 'mobx';

export const incrementCounterRequestedAction = action(
    (value: number, stores: { counter: CounterModel }) => {
        stores.counter.increment(value);
    }
);

export const incrementCounterSuccessAction = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);

export const incrementCounterFailureAction = action((error: Error) => {
    if (error.message === FLOW_CANCELLED) {
        return;
    }
    throw error;
});

export const saveCounterFailureAction = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.decrement(value)
);

export const getCounterSuccessAction = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);

export const getCounterFailureAction = action((error: Error) => {
    if (error.message === FLOW_CANCELLED) {
        return;
    }
    throw error;
});
