import { CounterModel } from '@stores/counter/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { saveCountSuccessEffect } from '../../effects/save-count/save-count.effect';

export class IncrementValueAndSaveOptimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: RootUseCaseMakeParams<number>): IncrementValueAndSaveOptimistic {
        const effect = saveCountSuccessEffect.build(store, persistence);
        return new IncrementValueAndSaveOptimistic(
            store.counter,
            effect,
            props
        );
    }

    constructor(
        private store: CounterModel,
        private effect: Effect<number, Promise<number>>,
        private props: number = 0
    ) {
        makeObservable(this, {
            execute: action.bound,
            saveFailure: action.bound
        });
    }

    execute(): void {
        this.store.increment(this.props);
        this.effect.execute(this.store.$count).catch(this.saveFailure);
    }

    saveFailure(): void {
        this.store.decrement(this.props);
    }
}

export const incrementValueAndSaveOptimisticUseCase = UseCaseBuilder.make(
    IncrementValueAndSaveOptimistic
);
