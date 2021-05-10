import { CounterModel } from '@stores/counter/counter.types';
import { FLOW_CANCELLED } from '@stores/helpers/effect/effect.helpers';
import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import {
    IncrementCount,
    incrementCountEffect
} from '../../effects/increment-count/increment-count.effect';

export class IncrementCounterAndSavePessimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: RootUseCaseMakeParams<number>): IncrementCounterAndSavePessimistic {
        const effect = incrementCountEffect.build(store, persistence);
        return new IncrementCounterAndSavePessimistic(
            store.counter,
            effect,
            props
        );
    }

    constructor(
        private store: CounterModel,
        private effect: IncrementCount,
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
export const incrementCounterAndSavePessimisticUseCase = UseCaseBuilder.make(
    IncrementCounterAndSavePessimistic
);
