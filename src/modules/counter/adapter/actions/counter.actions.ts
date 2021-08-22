import { CounterModel } from '@stores/domain/counter/counter-store.types';
import { FLOW_CANCELLED } from '@stores/helpers/stores.helpers';
import { action } from 'mobx';

const incrementCounter = action(
    (value: number, stores: { counter: CounterModel }) => {
        stores.counter.increment(value);
    }
);

const incrementCounterEffectSuccess = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);

const incrementCounterEffectFailure = action((error: Error) => {
    if (error.message === FLOW_CANCELLED) {
        return;
    }
    throw error;
});

const saveCounterEffectFailure = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.decrement(value)
);

const fetchCounterEffectSuccess = action(
    (value: number, stores: { counter: CounterModel }) =>
        stores.counter.setCount(value)
);

const fetchCounterEffectFailure = action((error: Error) => {
    if (error.message === FLOW_CANCELLED) {
        return;
    }
    throw error;
});

export const counterActions = {
    incrementCounter,
    incrementCounterEffectSuccess,
    incrementCounterEffectFailure,
    saveCounterEffectFailure,
    fetchCounterEffectSuccess,
    fetchCounterEffectFailure
};
