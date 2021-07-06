export interface CounterSource {
    get(): Promise<number>;
    set(value: number): Promise<number>;
    increment(value: number): Promise<number>;
}

export type CounterSourceModel = CounterSource;
