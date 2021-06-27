import { CounterModel } from '@stores/domain/counter/counter.types';
import { UseCase } from '@stores/helpers/store.types';
import { action, makeObservable } from 'mobx';
import { injectable } from 'tsyringe';

@injectable()
export class IncrementCounterUseCase implements UseCase {
    constructor(private store: CounterModel) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(value: number): void {
        this.store.increment(value);
    }
}
