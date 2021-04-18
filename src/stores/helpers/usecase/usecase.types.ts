export interface UseCase {
    execute(): Promise<void>;
}

export interface UseCaseParams<S, R, P> {
    store: S;
    persistence: R;
    props: P | undefined;
}

export interface UseCaseConstructor<S, R, P> {
    make(params: UseCaseParams<S, R, P>): UseCase;
}

export interface UseCaseInteractionBuilder<S, P> {
    build(state: S, persistence: P): UseCase;
}

export interface StoreExecuter<S, P> {
    execute(builder: UseCaseInteractionBuilder<S, P>): void;
}
