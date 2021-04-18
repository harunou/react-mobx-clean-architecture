export interface Effect<A = unknown, R = unknown> {
    execute(args: A): R;
}

export interface EffectParams<S, P> {
    store: S;
    persistence: P;
}

export interface EffectConstructor<S, P, A, R> {
    make(params: EffectParams<S, P>): Effect<A, R>;
}

export interface EffectInteractionBuilder<S, P, A, R> {
    build(state: S, persistence: P): Effect<A, R>;
}
