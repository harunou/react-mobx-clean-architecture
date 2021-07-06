import { CounterModel } from '@stores/domain/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/stores.helpers';
import { action } from 'mobx';

export const incrementCounterRequested = action(
    (value: number, stores: { counter: CounterModel }) => {
        stores.counter.increment(value);
    }
);

export const incrementCounterEffectSuccess = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);

export const incrementCounterEffectFailure = action((error: Error) => {
    if (error.message === FLOW_CANCELLED) {
        return;
    }
    throw error;
});

export const setCounterEffectFailure = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.decrement(value)
);

export const getCounterEffectSuccess = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);

export const getCounterEffectFailure = action((error: Error) => {
    if (error.message === FLOW_CANCELLED) {
        return;
    }
    throw error;
});
