import { noop } from '@core/core.helpers';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { CancellablePromise, runInAction } from 'mobx/dist/internal';

// action contains application logic, transaction of state from A to B
export const incrementCounterAction = (counter: CounterModel) => (
    value: number
): void => runInAction(() => counter.increment(value));

export const incrementCounterAndSaveOptimisticAction = (
    counter: CounterModel,
    saveCountEffect: (value: number) => CancellablePromise<number>
) => (value: number): CancellablePromise<unknown> => {
    counter.increment(value);
    const e = saveCountEffect(counter.count$);
    e.catch(() => {
        counter.decrement(value);
    });
    return e;
};

export const incrementCounterAndSavePessimisticAction = (
    counter: CounterModel,
    incrementCountEffect: (value: number) => CancellablePromise<number>
) => (value: number): CancellablePromise<unknown> => {
    const e = incrementCountEffect(value);
    e.then((value) => counter.increment(value));
    return e;
};

export const enterCounterViewAction = (
    counter: CounterModel,
    getCount: () => CancellablePromise<number>
) => (): CancellablePromise<unknown> => {
    const e = getCount();
    e.then((value) => counter.increment(value));
    return e;
};

export const leaveCounterViewAction = () => (
    ...promises: Array<CancellablePromise<unknown>>
): CancellablePromise<unknown> => {
    return (noop(promises) as unknown) as CancellablePromise<unknown>;
};
