import { CounterModel } from '@stores/domain/counter/counter.types';
import { action, makeObservable } from 'mobx';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';

export class IncrementCounterAndSavePessimisticUseCase {
    constructor(
        private store: CounterModel,
        private effect: IncrementCountEffect
    ) {
        makeObservable(this, {
            saveSuccess: action.bound
        });
    }

    execute(value: number): void {
        this.effect
            .execute(value)
            .then(this.saveSuccess)
            .catch((error: Error) => {
                // if (error.message === FLOW_CANCELLED) {
                //     return;
                // }
                throw error;
            });
    }

    saveSuccess(count: number): void {
        this.store.setCount(count);
    }
}
