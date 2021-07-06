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
    incrementCounterSuccessAction,
    getCounterSuccessAction,
    incrementCounterRequestedAction,
    incrementCounterFailureAction,
    saveCounterFailureAction,
    getCounterFailureAction
} from './actions/counter.actions';
import {
    getCounterEffect,
    incrementCounterEffect,
    setCounterEffect
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
            incrementCounterRequestedAction(1, { counter }),
        addOneAndSaveOptimisticButtonPushed: (): void => {
            incrementCounterRequestedAction(1, { counter });
            saveCountPromise = setCounterEffect(counter.count$, {
                counterSource
            });
            saveCountPromise.catch(() =>
                saveCounterFailureAction(1, { counter })
            );
        },
        addOneAndSavePessimisticButtonPushed: (): void => {
            incrementCountPromise = incrementCounterEffect(1, {
                counterSource
            });
            incrementCountPromise
                .then((value) => {
                    incrementCounterSuccessAction(value, { counter });
                })
                .catch((error: Error) => incrementCounterFailureAction(error));
        },
        mounted: (): void => {
            getCountPromise = getCounterEffect({ counterSource });
            getCountPromise
                .then((value: number) =>
                    getCounterSuccessAction(value, { counter })
                )
                .catch((error: Error) => {
                    getCounterFailureAction(error);
                });
        },
        unmounted: (): void => {
            saveCountPromise.cancel();
            incrementCountPromise.cancel();
            getCountPromise.cancel();
        }
    });
};
