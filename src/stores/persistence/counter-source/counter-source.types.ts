export interface CounterSource {
    get(): Promise<number>;
    increment(value: number): Promise<number>;
    save(value: number): Promise<number>;
}

export type CounterSourceModel = CounterSource;
