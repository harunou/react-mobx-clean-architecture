import { CounterModel } from '@stores/counter/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
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
        private effect: Effect<number, Promise<number>>,
        private props: number = 0
    ) {
        makeObservable(this, {
            execute: action.bound,
            saveFailure: action.bound
        });
    }

    async execute(): Promise<void> {
        const count = this.store.$count + this.props;
        this.store.setCount(count);
        await this.effect.execute(count).catch(this.saveFailure);
    }

    saveFailure(): void {
        this.store.setCount(this.store.$count - this.props);
    }
}
export const increaseValueAndSaveOptimisticUseCase = UseCaseBuilder.make(
    IncreaseValueAndSaveOptimistic
);
