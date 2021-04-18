export interface Selector<R = unknown> {
    result: R;
}

export interface SelectorInteractionBuilder<S, R> {
    build(state: S): Selector<R>;
}

export interface StoreQuery<S> {
    query<R>(builder: SelectorInteractionBuilder<S, R>): Selector<R>;
}

export interface UseCase {
    execute(): Promise<void>;
}

export interface UseCaseInteractionBuilder<S, P> {
    build(state: S, persistence: P): UseCase;
}

export interface StoreExecuter<S, P> {
    execute(builder: UseCaseInteractionBuilder<S, P>): Promise<void>;
}
