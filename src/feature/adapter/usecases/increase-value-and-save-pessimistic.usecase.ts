import { CounterModel } from '@stores/counter/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { UseCase } from '@stores/helpers/usecase/usecase.types';
import { RootUseCaseParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { CancellablePromise } from 'mobx/dist/internal';
import { saveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSavePessimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: RootUseCaseParams<number>): IncreaseValueAndSavePessimistic {
        const effect = saveCountSuccessEffect.build(store, persistence);
        return new IncreaseValueAndSavePessimistic(
            store.counter,
            effect,
            props
        );
    }

    constructor(
        private store: CounterModel,
        private effect: Effect<CancellablePromise<number>>,
        private props: number = 0
    ) {
        makeObservable(this, {
            saveSuccess: action.bound
        });
    }

    execute(): void {
        this.effect
            .execute(this.store.$count + this.props)
            .then(this.saveSuccess);
    }

    saveSuccess(count: number): void {
        this.store.setCount(count);
    }
}
export const IncreaseValueAndSavePessimisticUseCase = UseCaseBuilder.make(
    IncreaseValueAndSavePessimistic
);
