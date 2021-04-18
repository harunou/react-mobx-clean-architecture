export interface Effect<R> {
    execute(): Promise<R>;
}

export interface EffectParams<S, P> {
    store: S;
    persistence: P;
}

export interface EffectConstructor<S, P, R> {
    make(params: EffectParams<S, P>): Effect<R>;
}

export interface EffectInteractionBuilder<S, P, R> {
    build(state: S, persistence: P): Effect<R>;
}
