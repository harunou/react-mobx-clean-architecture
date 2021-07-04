import { RootStore } from '@stores/root/root.store';
import {
    makeCancellablePromiseStub,
    sliceCounterSourceStore,
    sliceCounterStore
} from '@stores/helpers/stores.helpers';
import { makeAutoObservable } from 'mobx';
import { Action } from '@stores/stores.types';
import { CancellablePromise } from 'mobx/dist/internal';
import {
    incrementCounterSuccess,
    getCounterSuccess,
    incrementCounterRequested,
    incrementCounterFailure,
    saveCounterFailure,
    getCounterFailure
} from './actions/counter.actions';
import {
    getCountEffect,
    incrementCountEffect,
    saveCountEffect
} from './effects/counter.effects';

export interface CounterController {
    addOneButtonPushed: Action;
    addOneAndSaveOptimisticButtonPushed: Action;
    addOneAndSavePessimisticButtonPushed: Action;
    mounted: Action;
    unmounted: Action;
}

export const counterController = (rootStore: RootStore): CounterController => {
    const counter = sliceCounterStore(rootStore);
    const counterSource = sliceCounterSourceStore(rootStore);

    let saveCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();
    let incrementCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();
    let getCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();

    return makeAutoObservable({
        addOneButtonPushed: (): void =>
            incrementCounterRequested(1, { counter }),
        addOneAndSaveOptimisticButtonPushed: (): void => {
            incrementCounterRequested(1, { counter });
            saveCountPromise = saveCountEffect(counter.count$, {
                counterSource
            });
            saveCountPromise.catch(() => saveCounterFailure(1, { counter }));
        },
        addOneAndSavePessimisticButtonPushed: (): void => {
            incrementCountPromise = incrementCountEffect(1, { counterSource });
            incrementCountPromise
                .then((value) => {
                    incrementCounterSuccess(value, { counter });
                })
                .catch((error: Error) => incrementCounterFailure(error));
        },
        mounted: (): void => {
            getCountPromise = getCountEffect({ counterSource });
            getCountPromise
                .then((value: number) => getCounterSuccess(value, { counter }))
                .catch((error: Error) => {
                    getCounterFailure(error);
                });
        },
        unmounted: (): void => {
            saveCountPromise.cancel();
            incrementCountPromise.cancel();
            getCountPromise.cancel();
        }
    });
};
