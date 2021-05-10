import { CounterModel } from '@stores/counter/counter.types';
import { FLOW_CANCELLED_MESSAGE } from '@stores/helpers/effect/effect.helpers';
import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import {
    GetCount,
    getCountEffect
} from '../../effects/get-count/get-count.effect';

export class EnterCounter implements UseCase {
    static make({ store, persistence }: RootUseCaseMakeParams): EnterCounter {
        const effect = getCountEffect.build(store, persistence);
        return new EnterCounter(store.counter, effect);
    }

    constructor(private store: CounterModel, private getCountEffect: GetCount) {
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
                if (error.message === FLOW_CANCELLED_MESSAGE) {
                    return;
                }
                throw error;
            });
    }

    getCountSuccess(count: number): void {
        this.store.setCount(count);
    }
}

export const enterCounterUseCase = UseCaseBuilder.make(EnterCounter);
