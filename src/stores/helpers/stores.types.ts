export interface Selector {
    result: number;
}
export interface SelectorBuilder<S> {
    build(state: S): Selector;
}

export interface UseCase {
    execute(): void;
}

export interface UseCaseBuilder<S, P> {
    build(state: S, persistence: P): UseCase;
}
