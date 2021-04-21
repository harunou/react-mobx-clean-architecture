export interface CounterDataSource {
    increment(increment: number, count: number): Promise<number>;
    set(count: number): Promise<number>;
}
