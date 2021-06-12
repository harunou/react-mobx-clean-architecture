import { COUNTER_STORE } from '@stores/domain/counter/counter.tokens';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/effect/effect.helpers';
import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'tsyringe';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';

@injectable()
export class IncrementCounterAndSavePessimisticUseCase implements UseCase {
    constructor(
        @inject(COUNTER_STORE) private store: CounterModel,
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
