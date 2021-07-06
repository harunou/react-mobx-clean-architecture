import { RootStore } from '@stores/root/root.store';
import {
    makeCancellablePromiseStub,
    sliceCounterSourceStore,
    sliceCounterStore
} from '@stores/helpers/stores.helpers';
import { Action } from '@stores/stores.types';
import { CancellablePromise } from 'mobx/dist/internal';
import { counterEffects } from './effects/counter.effects';
import { counterActions } from './actions/counter.actions';

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

    return {
        addOneButtonPushed: (): void =>
            counterActions.incrementCounterRequested(1, { counter }),
        addOneAndSaveOptimisticButtonPushed: (): void => {
            counterActions.incrementCounterRequested(1, { counter });
            saveCountPromise = counterEffects.setCounter(counter.count$, {
                counterSource
            });
            saveCountPromise.catch(() =>
                counterActions.setCounterEffectFailure(1, { counter })
            );
        },
        addOneAndSavePessimisticButtonPushed: (): void => {
            incrementCountPromise = counterEffects.incrementCounter(1, {
                counterSource
            });
            incrementCountPromise
                .then((value) => {
                    counterActions.incrementCounterEffectSuccess(value, {
                        counter
                    });
                })
                .catch((error: Error) =>
                    counterActions.incrementCounterEffectFailure(error)
                );
        },
        mounted: (): void => {
            getCountPromise = counterEffects.getCounter({ counterSource });
            getCountPromise
                .then((value: number) =>
                    counterActions.getCounterEffectSuccess(value, { counter })
                )
                .catch((error: Error) => {
                    counterActions.getCounterEffectFailure(error);
                });
        },
        unmounted: (): void => {
            saveCountPromise.cancel();
            incrementCountPromise.cancel();
            getCountPromise.cancel();
        }
    };
};
