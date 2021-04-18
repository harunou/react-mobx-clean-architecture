import { CounterModel } from '@stores/counter/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { UseCase } from '@stores/helpers/usecase/usecase.types';
import { RootUseCaseParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { CancellablePromise } from 'mobx/dist/internal';
import { saveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSaveOptimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: RootUseCaseParams<number>): IncreaseValueAndSaveOptimistic {
        const effect = saveCountSuccessEffect.build(store, persistence);
        return new IncreaseValueAndSaveOptimistic(store.counter, effect, props);
    }

    constructor(
        private store: CounterModel,
        private effect: Effect<CancellablePromise<number>>,
        private props: number = 0
    ) {
        makeObservable(this, {
            execute: action.bound,
            saveFailure: action.bound
        });
    }

    execute(): void {
        const count = this.store.$count + this.props;
        this.store.setCount(count);
        this.effect.execute(count).catch(this.saveFailure);
    }

    saveFailure(): void {
        this.store.setCount(this.store.$count - this.props);
    }
}
export const IncreaseValueAndSaveOptimisticUseCase = UseCaseBuilder.make(
    IncreaseValueAndSaveOptimistic
);
