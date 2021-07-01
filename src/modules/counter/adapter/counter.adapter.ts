import { CounterStore } from '@stores/domain/counter/counter.store';
import { CounterSourceStore } from '@stores/persistence/counter-source/counter-source.store';
import { RootStore } from '@stores/root/root.store';
import { CancellablePromise, flow } from 'mobx/dist/internal';
import {
    incrementCounterAction,
    incrementCounterAndSaveOptimisticAction,
    incrementCounterAndSavePessimisticAction,
    enterCounterViewAction,
    leaveCounterViewAction
} from './counter.actions';
import {
    getCountEffect,
    incrementCountEffect,
    saveCountEffect
} from './counter.effects';
import { countMultiplySelector, countSelector } from './counter.selectors';

export function makeCancellablePromiseStub(): CancellablePromise<never> {
    const f = flow(function* generator() {
        /* noop */
    });
    return f() as CancellablePromise<never>;
}

const sliceCounterStore = (rootStore: RootStore): CounterStore => {
    return rootStore.domain.counter;
};

const sliceCounterSourceStore = (rootStore: RootStore): CounterSourceStore => {
    return rootStore.persistence.counterSource;
};

export const counterAdapter = (rootStore: RootStore): unknown => {
    const counter = sliceCounterStore(rootStore);
    const counterSource = sliceCounterSourceStore(rootStore);
    const multiplyFactor = 10;

    const getCount = getCountEffect(counterSource);
    const saveCount = saveCountEffect(counterSource);
    const incrementCount = incrementCountEffect(counterSource);

    const incrementCounter = incrementCounterAction(counter);
    const incrementCounterAndSaveOptimistic = incrementCounterAndSaveOptimisticAction(
        counter,
        saveCount
    );
    const incrementCounterAndSavePessimistic = incrementCounterAndSavePessimisticAction(
        counter,
        incrementCount
    );
    const enterCounterView = enterCounterViewAction(counter, getCount);
    const leaveCounterView = leaveCounterViewAction();

    let saveOptimisticCountPromise: CancellablePromise<unknown> = makeCancellablePromiseStub();
    let savePessimisticCountPromise: CancellablePromise<unknown> = makeCancellablePromiseStub();
    let getCountPromise: CancellablePromise<unknown> = makeCancellablePromiseStub();

    return {
        count$: countSelector(counter),
        multiplyCount$: countMultiplySelector(counter, multiplyFactor),
        addOneButtonPushed: (): void => incrementCounter(1),
        addOneAndSaveOptimisticButtonPushed: (): void => {
            saveOptimisticCountPromise = incrementCounterAndSaveOptimistic(1);
        },
        addOneAndSavePessimisticButtonPushed: (): void => {
            savePessimisticCountPromise = incrementCounterAndSavePessimistic(1);
        },
        mounted: (): void => {
            getCountPromise = enterCounterView();
        },
        unmounted: (): void => {
            leaveCounterView(
                saveOptimisticCountPromise,
                savePessimisticCountPromise,
                getCountPromise
            );
        }
    };
};
