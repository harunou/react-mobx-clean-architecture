import { noop } from '@core/core.helpers';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { runInAction } from 'mobx/dist/internal';

// action contains application logic, transaction of state from A to B
export const incrementCounterAction = (counter: CounterModel) => (
    value: number
): void => runInAction(() => counter.increment(value));

export const incrementCounterSuccessAction = (counter: CounterModel) => (
    value: number
): void => runInAction(() => counter.increment(value));

export const incrementCounterFailureAction = () => (error: Error): void =>
    noop(error);

export const saveCounterFailureAction = (
    counter: CounterModel,
    value: number
) => (): void => {
    runInAction(() => {
        counter.decrement(value);
    });
};

export const getCounterSuccessAction = (counter: CounterModel) => (
    value: number
): void => runInAction(() => counter.setCount(value));
