import { RootStore } from '@stores/root/root-store';
import { makeCancellablePromiseStub } from '@stores/helpers/stores.helpers';
import { UseCase } from '@stores/helpers/stores.types';
import { CancellablePromise } from 'mobx/dist/internal';
import { counterEffects } from './effects/counter.effects';
import { counterActions } from './actions/counter.actions';
import {
    sliceCounterSourceStore,
    sliceCounterStore
} from '@stores/root/root-store.helpers';
import { ModuleStore } from '../stores/module-store';
import { noop } from '@core/core.helpers';

export interface CounterController {
    addValueToCounter: UseCase<number>;
    addOneToCounter: UseCase;
    addOneToCounterAndSaveOptimistic: UseCase;
    addOneAndSavePessimistic: UseCase;
    loadCountAndInitializeCounter: UseCase;
    cancelAllPendingPromises: UseCase;
}

export const counterController = (stores: {
    rootStore: RootStore;
    moduleStore: ModuleStore;
}): CounterController => {
    noop(stores.moduleStore);

    const counter = sliceCounterStore(stores.rootStore);
    const counterSource = sliceCounterSourceStore(stores.rootStore);

    let saveCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();
    let incrementCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();
    let getCountPromise: CancellablePromise<number> = makeCancellablePromiseStub();

    return {
        addValueToCounter: (payload: number): void =>
            counterActions.incrementCounterRequested(payload, { counter }),
        addOneToCounter: (): void =>
            counterActions.incrementCounterRequested(1, { counter }),
        addOneToCounterAndSaveOptimistic: (): void => {
            counterActions.incrementCounterRequested(1, { counter });
            saveCountPromise = counterEffects.setCounter(counter.count$, {
                counterSource
            });
            saveCountPromise.catch(() =>
                counterActions.setCounterEffectFailure(1, { counter })
            );
        },
        addOneAndSavePessimistic: (): void => {
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
        loadCountAndInitializeCounter: (): void => {
            getCountPromise = counterEffects.getCounter({ counterSource });
            getCountPromise
                .then((value: number) =>
                    counterActions.getCounterEffectSuccess(value, { counter })
                )
                .catch((error: Error) => {
                    counterActions.getCounterEffectFailure(error);
                });
        },
        cancelAllPendingPromises: (): void => {
            saveCountPromise.cancel();
            incrementCountPromise.cancel();
            getCountPromise.cancel();
        }
    };
};
