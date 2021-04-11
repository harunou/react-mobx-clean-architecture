export interface CounterState {
    $count: number;
}

export interface CounterModel extends CounterState {
    setCount(v: number): void;
}
