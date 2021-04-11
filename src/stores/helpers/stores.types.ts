export interface Selector<R> {
    result: R;
}

export interface SelectorConstructor<S, P, R> {
    make(params: SelectorMakeParams<S, P>): Selector<R>;
}

export interface SelectorMakeParams<S, P> {
    store: S;
    props: P | undefined;
}

export interface SelectorBuilder<S, R> {
    build(state: S): Selector<R>;
}

export interface StoreQuery<S> {
    query<R>(
        builder: SelectorBuilder<S, R>
    ): ReturnType<SelectorBuilder<S, R>['build']>;
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
