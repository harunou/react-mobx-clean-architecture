import { CounterModel } from '@stores/counter/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { saveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSavePessimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: RootUseCaseMakeParams<number>): IncreaseValueAndSavePessimistic {
        const effect = saveCountSuccessEffect.build(store, persistence);
        return new IncreaseValueAndSavePessimistic(
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
            saveSuccess: action.bound
        });
    }

    async execute(): Promise<void> {
        await this.effect
            .execute(this.store.$count + this.props)
            .then(this.saveSuccess);
    }

    saveSuccess(count: number): void {
        this.store.setCount(count);
    }
}
export const increaseValueAndSavePessimisticUseCase = UseCaseBuilder.make(
    IncreaseValueAndSavePessimistic
);
