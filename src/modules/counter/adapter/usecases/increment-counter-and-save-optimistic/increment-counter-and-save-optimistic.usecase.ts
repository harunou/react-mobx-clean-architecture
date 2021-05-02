import { CounterModel } from '@stores/counter/counter.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import {
    SaveCount,
    saveCountEffect
} from '../../effects/save-count/save-count.effect';

export class IncrementCounterAndSaveOptimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: RootUseCaseMakeParams<number>): IncrementCounterAndSaveOptimistic {
        const effect = saveCountEffect.build(store, persistence);
        return new IncrementCounterAndSaveOptimistic(
            store.counter,
            effect,
            props
        );
    }

    constructor(
        private store: CounterModel,
        private effect: SaveCount,
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

export const incrementCounterAndSaveOptimisticUseCase = UseCaseBuilder.make(
    IncrementCounterAndSaveOptimistic
);
