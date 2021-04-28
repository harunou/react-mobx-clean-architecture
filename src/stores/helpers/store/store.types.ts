export interface Selector<R = unknown> {
    result: R;
}

export interface SelectorInteractionBuilder<S, L> {
    build(state: S): L;
}

export interface StoreQuery<S> {
    query<L extends Selector>(builder: SelectorInteractionBuilder<S, L>): L;
}

export interface UseCase {
    execute(): void;
}

export interface UseCaseInteractionBuilder<S, P> {
    build(state: S, persistence: P): UseCase;
}

export interface StoreExecuter<S, P> {
    execute(builder: UseCaseInteractionBuilder<S, P>): void;
}
