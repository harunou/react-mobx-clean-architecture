export interface Effect<A = unknown, R = unknown> {
    execute(args: A): R;
}

export interface CancellableEffect<A = unknown, R = unknown>
    extends Effect<A, R> {
    cancel(): void;
}

export interface EffectMakeParams<S, P> {
    store: S;
    persistence: P;
}

export interface EffectConstructor<S, P, E> {
    make(params: EffectMakeParams<S, P>): E;
}

export interface EffectInteractionBuilder<S, P, E> {
    build(state: S, persistence: P): E;
}
