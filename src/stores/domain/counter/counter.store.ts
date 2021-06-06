import { action, makeObservable, observable, runInAction } from 'mobx';
import { inject, injectable } from 'tsyringe';
import { COUNTER_INITIAL_STATE } from './counter.tokens';
import { CounterModel, CounterState } from './counter.types';

@injectable()
export class CounterStore implements CounterModel {
    count$ = 0;

    constructor(@inject(COUNTER_INITIAL_STATE) state: CounterState) {
        makeObservable(this, {
            count$: observable,
            setCount: action,
            increment: action,
            decrement: action
        });
        runInAction(() => {
            this.init(state);
        });
    }

    private init(state: CounterState): void {
        Object.assign(this, state);
    }

    setCount(value: number): void {
        this.count$ = value;
    }

    increment(value: number): void {
        this.count$ += value;
    }

    decrement(value: number): void {
        this.count$ -= value;
    }
}
