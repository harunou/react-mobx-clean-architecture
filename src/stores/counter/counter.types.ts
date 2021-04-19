export interface CounterState {
    $count: number;
}

export interface CounterModel extends CounterState {
    setCount(v: number): void;
    increment(value: number): void;
    decrement(value: number): void;
}
