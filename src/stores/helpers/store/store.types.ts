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

export interface UseCaseInteractionBuilder<S, R, U> {
    build(state: S, persistence: R): U;
}

export interface StoreExecuter<S, R> {
    execute<U extends UseCase>(
        builder: UseCaseInteractionBuilder<S, R, U>
    ): void;
}
