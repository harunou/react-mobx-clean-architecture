export interface CounterSource {
    get(): Promise<number>;
    increment(increment: number): Promise<number>;
    save(count: number): Promise<number>;
}
