export interface CounterDataSource {
    increment(increment: number): Promise<number>;
    save(count: number): Promise<number>;
}
