export interface Selector {
    result: number;
}

export interface SelectorConstructor<S> {
    make(params: SelectorMakeParams<S>): Selector;
}

export interface SelectorMakeParams<S> {
    store: S;
    params?: number;
}

export interface SelectorBuilder<S> {
    build(state: S): Selector;
}

export interface StoreQuery<S> {
    query(builder: SelectorBuilder<S>): Selector;
}

export interface UseCase {
    execute(): void;
}

export interface UseCaseConstructor<S, P> {
    make(params: UseCaseMakeParams<S, P>): UseCase;
}

export interface UseCaseMakeParams<S, P> {
    store: S;
    persistence: P;
    params?: number;
}

export interface UseCaseBuilder<S, P> {
    build(state: S, persistence: P): UseCase;
}

export interface StoreExecuter<S, P> {
    execute(builder: UseCaseBuilder<S, P>): void;
}
