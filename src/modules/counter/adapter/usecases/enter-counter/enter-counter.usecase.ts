import { CounterModel } from '@stores/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/effect/effect.helpers';
import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { GetCountEffect } from '../../effects/get-count/get-count.effect';

export class EnterCounter implements UseCase {
    constructor(
        private store: CounterModel,
        private getCountEffect: GetCountEffect
    ) {
        makeObservable(this, {
            execute: action.bound,
            getCountSuccess: action.bound
        });
    }

    execute(): void {
        this.getCountEffect
            .execute()
            .then(this.getCountSuccess)
            .catch((error: Error) => {
                if (error.message === FLOW_CANCELLED) {
                    return;
                }
                throw error;
            });
    }

    getCountSuccess(count: number): void {
        this.store.setCount(count);
    }
}
