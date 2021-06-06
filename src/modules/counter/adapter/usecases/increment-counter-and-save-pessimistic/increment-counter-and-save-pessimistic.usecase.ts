import { CounterModel } from '@stores/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/effect/effect.helpers';
import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';

export class IncrementCounterAndSavePessimistic implements UseCase {
    constructor(
        private store: CounterModel,
        private effect: IncrementCountEffect,
        private props: number = 0
    ) {
        makeObservable(this, {
            saveSuccess: action.bound
        });
    }

    execute(): void {
        this.effect
            .execute(this.props)
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
