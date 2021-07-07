export interface CounterModel {
    count$: number;
    setCount(value: number): void;
    increment(value: number): void;
    decrement(value: number): void;
}

export type CounterState = Pick<CounterModel, 'count$'>;
