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

export interface UseCaseInteractionBuilder<S, P> {
    build(state: S, persistence: P): UseCase;
}

export interface StoreExecuter<S, P> {
    execute(builder: UseCaseInteractionBuilder<S, P>): void;
}
