export interface CounterDataSource {
    saveSuccess(value: number): Promise<number>;
    saveFailure(value: number): Promise<number>;
}
