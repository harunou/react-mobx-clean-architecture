import { RootStore } from '@stores/root/root-store';
import { makeCancellablePromiseStub } from '@stores/helpers/stores.helpers';
import { UseCase } from '@stores/helpers/stores.types';
import { action, AnnotationsMap, CancellablePromise } from 'mobx/dist/internal';
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
    loadDataAndInitializeStores: UseCase;
    cancelAllPendingPromises: UseCase;
}

export const counterController = (stores: {
    rootStore: RootStore;
    moduleStore: ModuleStore;
}): CounterController => {
    noop(stores.moduleStore);

    const counter = sliceCounterStore(stores.rootStore);
    const counterSource = sliceCounterSourceStore(stores.rootStore);

    let saveCounterPromise: CancellablePromise<number> = makeCancellablePromiseStub();
    let incrementCounterPromise: CancellablePromise<number> = makeCancellablePromiseStub();
    let getCounterPromise: CancellablePromise<number> = makeCancellablePromiseStub();

    return {
        addValueToCounter: (payload: number): void =>
            counterActions.incrementCounter(payload, { counter }),
        addOneToCounter: (): void =>
            counterActions.incrementCounter(1, { counter }),
        addOneToCounterAndSaveOptimistic: async (): Promise<void> => {
            counterActions.incrementCounter(1, { counter });
            saveCounterPromise = counterEffects.saveCounter(counter.count$, {
                counterSource
            });
            try {
                await saveCounterPromise;
            } catch (error) {
                counterActions.saveCounterEffectFailure(1, { counter });
            }
        },
        addOneAndSavePessimistic: async (): Promise<void> => {
            incrementCounterPromise = counterEffects.incrementCounter(1, {
                counterSource
            });
            try {
                const value = await incrementCounterPromise;
                counterActions.incrementCounterEffectSuccess(value, {
                    counter
                });
            } catch (error) {
                counterActions.incrementCounterEffectFailure(error);
            }
        },
        loadDataAndInitializeStores: async (): Promise<void> => {
            getCounterPromise = counterEffects.fetchCounter({ counterSource });
            try {
                const value = await getCounterPromise;
                counterActions.fetchCounterEffectSuccess(value, { counter });
            } catch (error) {
                counterActions.fetchCounterEffectFailure(error);
            }
        },
        cancelAllPendingPromises: (): void => {
            saveCounterPromise.cancel();
            incrementCounterPromise.cancel();
            getCounterPromise.cancel();
        }
    };
};
