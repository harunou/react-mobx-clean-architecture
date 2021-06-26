import { COUNTER_STORE } from '@stores/domain/counter/counter.tokens';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/store.helpers';
import { UseCase } from '@stores/helpers/store.types';
import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'tsyringe';
import { GetCountEffect } from '../../effects/get-count/get-count.effect';

@injectable()
export class EnterCounterUseCase implements UseCase {
    constructor(
        @inject(COUNTER_STORE) private store: CounterModel,
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
