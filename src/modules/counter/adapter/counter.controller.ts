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
    incrementCounterEffectSuccess,
    getCounterEffectSuccess,
    incrementCounterRequested,
    incrementCounterEffectFailure,
    setCounterEffectFailure,
    getCounterEffectFailure
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
            incrementCounterRequested(1, { counter }),
        addOneAndSaveOptimisticButtonPushed: (): void => {
            incrementCounterRequested(1, { counter });
            saveCountPromise = setCounterEffect(counter.count$, {
                counterSource
            });
            saveCountPromise.catch(() =>
                setCounterEffectFailure(1, { counter })
            );
        },
        addOneAndSavePessimisticButtonPushed: (): void => {
            incrementCountPromise = incrementCounterEffect(1, {
                counterSource
            });
            incrementCountPromise
                .then((value) => {
                    incrementCounterEffectSuccess(value, { counter });
                })
                .catch((error: Error) => incrementCounterEffectFailure(error));
        },
        mounted: (): void => {
            getCountPromise = getCounterEffect({ counterSource });
            getCountPromise
                .then((value: number) =>
                    getCounterEffectSuccess(value, { counter })
                )
                .catch((error: Error) => {
                    getCounterEffectFailure(error);
                });
        },
        unmounted: (): void => {
            saveCountPromise.cancel();
            incrementCountPromise.cancel();
            getCountPromise.cancel();
        }
    });
};
