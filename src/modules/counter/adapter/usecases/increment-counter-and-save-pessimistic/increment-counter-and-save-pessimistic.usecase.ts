import { CounterModel } from '@stores/domain/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/store.helpers';
import { UseCase } from '@stores/helpers/store.types';
import { action, makeObservable } from 'mobx';
import { injectable } from 'tsyringe';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';

@injectable()
export class IncrementCounterAndSavePessimisticUseCase implements UseCase {
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
                if (error.message === FLOW_CANCELLED) {
                    return;
                }
                throw error;
            });
    }

    saveSuccess(count: number): void {
        this.store.setCount(count);
    }
}
