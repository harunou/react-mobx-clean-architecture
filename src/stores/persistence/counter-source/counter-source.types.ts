export abstract class CounterSource {
    abstract get(): Promise<number>;
    abstract increment(value: number): Promise<number>;
    abstract save(value: number): Promise<number>;
}
