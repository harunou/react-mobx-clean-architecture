import { action, makeObservable, observable, runInAction } from 'mobx';
import {
    container,
    inject,
    injectable,
    InjectionToken,
    Lifecycle
} from 'tsyringe';
import { CounterModel, CounterState } from './counter.types';

export const COUNTER_INITIAL_STATE: InjectionToken<CounterState> = Symbol(
    'COUNTER_INITIAL_STATE'
);

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

export const COUNTER_STORE: InjectionToken<CounterStore> = Symbol(
    'COUNTER_STORE'
);

container.register(
    COUNTER_STORE,
    { useClass: CounterStore },
    { lifecycle: Lifecycle.Singleton }
);
