import { CounterStore } from '@stores/domain/counter/counter.store';
import { CounterSourceStore } from '@stores/persistence/counter-source/counter-source.store';
import { RootStore } from '@stores/root/root.store';
import { CancellablePromise, flow } from 'mobx/dist/internal';
import {
    incrementCounterSuccessAction,
    getCounterSuccessAction,
    incrementCounterAction,
    incrementCounterFailureAction,
    saveCounterFailureAction
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
    const incrementCounterSuccess = incrementCounterSuccessAction(counter);
    const incrementCounterFailure = incrementCounterFailureAction();
    const getCounterSuccess = getCounterSuccessAction(counter);

    let saveCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();
    let incrementCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();
    let getCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();

    return {
        count$: countSelector(counter),
        multiplyCount$: countMultiplySelector(counter, multiplyFactor),
        addOneButtonPushed: (): void => incrementCounter(1),
        addOneAndSaveOptimisticButtonPushed: (): void => {
            incrementCounter(1);
            saveCountPromise = saveCount(1);
            saveCountPromise.catch(saveCounterFailureAction(counter, 1));
        },
        addOneAndSavePessimisticButtonPushed: (): void => {
            incrementCountPromise = incrementCount(1);
            incrementCountPromise
                .then(incrementCounterSuccess)
                .catch(incrementCounterFailure);
        },
        mounted: (): void => {
            getCountPromise = getCount();
            getCountPromise.then(getCounterSuccess);
        },
        unmounted: (): void => {
            saveCountPromise.cancel();
            incrementCountPromise.cancel();
            getCountPromise.cancel();
        }
    };
};
