import { CounterModel } from '@stores/counter/counter.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { SaveCountEffect } from '../../effects/save-count/save-count.effect';

export class IncrementCounterAndSaveOptimistic implements UseCase {
    constructor(
        private store: CounterModel,
        private effect: SaveCountEffect,
        private props: number = 0
    ) {
        makeObservable(this, {
            execute: action.bound,
            saveFailure: action.bound
        });
    }

    execute(): void {
        this.store.increment(this.props);
        this.effect.execute(this.store.count$).catch(this.saveFailure);
    }

    saveFailure(): void {
        this.store.decrement(this.props);
    }
}
