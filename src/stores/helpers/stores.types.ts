export interface Selector {
    result: number;
}

export interface SelectorConstructor<S, P> {
    make(params: SelectorMakeParams<S, P>): Selector;
}

export interface SelectorMakeParams<S, P> {
    store: S;
    props: P | undefined;
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

export interface UseCaseConstructor<S, R, P> {
    make(params: UseCaseMakeParams<S, R, P>): UseCase;
}

export interface UseCaseMakeParams<S, R, P> {
    store: S;
    persistence: R;
    props: P | undefined;
}

export interface UseCaseBuilder<S, P> {
    build(state: S, persistence: P): UseCase;
}

export interface StoreExecuter<S, P> {
    execute(builder: UseCaseBuilder<S, P>): void;
}
