export interface CounterSource {
    increment(increment: number): Promise<number>;
    save(count: number): Promise<number>;
}
