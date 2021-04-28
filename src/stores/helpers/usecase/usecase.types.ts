export interface UseCaseMakeParams<S, R, P> {
    store: S;
    persistence: R;
    props: P | undefined;
}

export interface UseCaseConstructor<S, R, P, U> {
    make(params: UseCaseMakeParams<S, R, P>): U;
}
