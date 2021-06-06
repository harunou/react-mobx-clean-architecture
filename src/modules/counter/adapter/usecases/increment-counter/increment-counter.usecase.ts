import { CounterModel } from '@stores/counter/counter.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';

export class IncrementCounter implements UseCase {
    constructor(private store: CounterModel, private props: number = 0) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(): void {
        this.store.increment(this.props);
    }
}
