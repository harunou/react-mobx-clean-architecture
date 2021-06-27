import { CounterStore } from '@stores/domain/counter/counter.store';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { UseCase } from '@stores/helpers/store.types';
import { action, makeObservable } from 'mobx';
import { inject, injectable } from 'tsyringe';

@injectable()
export class IncrementCounterUseCase implements UseCase {
    constructor(@inject(CounterStore) private store: CounterModel) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(value: number): void {
        this.store.increment(value);
    }
}
