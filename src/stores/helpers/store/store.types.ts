export interface Selector<R = unknown> {
    result: R;
}

// TODO(harunou): extend selector
export interface SelectorWithProps<R = unknown, P = unknown> {
    result: R;
    withProps(...props: P[]): this;
}

export interface UseCase<P = unknown> {
    execute(...props: P[]): void;
}

export interface UseCaseInteractionBuilder<S, R, U> {
    build(state: S, persistence: R): U;
}
