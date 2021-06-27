export abstract class CounterState {
    abstract count$: number;
}

export abstract class CounterModel extends CounterState {
    abstract setCount(value: number): void;
    abstract increment(value: number): void;
    abstract decrement(value: number): void;
}
