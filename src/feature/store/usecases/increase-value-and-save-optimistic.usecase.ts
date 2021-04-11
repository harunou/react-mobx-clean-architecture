import { action, makeObservable } from 'mobx';
import { CounterModel } from '../../../stores/counter/counter.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { AppUseCaseParams } from '../../../stores/app/app.types';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSaveOptimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: AppUseCaseParams<number>): IncreaseValueAndSaveOptimistic {
        const effect = SaveCountSuccessEffect.make(persistence);
        return new IncreaseValueAndSaveOptimistic(store.counter, effect, props);
    }

    constructor(
        private store: CounterModel,
        private effect: SaveCountSuccessEffect,
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
        this.effect.save(count).catch(this.saveFailure);
    }

    saveFailure(): void {
        this.store.setCount(this.store.$count - this.props);
    }
}
export const IncreaseValueAndSaveOptimisticUseCase = UseCaseInteractionBuilder.make(
    IncreaseValueAndSaveOptimistic
);
