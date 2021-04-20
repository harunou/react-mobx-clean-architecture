export interface CounterDataSource {
    increment(increment: number, count: number): Promise<number>;
    saveSuccess(value: number): Promise<number>;
    saveFailure(value: number): Promise<number>;
}
