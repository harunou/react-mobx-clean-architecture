export interface CounterDataSource {
    increment(increment: number, count: number): Promise<number>;
    save(count: number): Promise<number>;
}
