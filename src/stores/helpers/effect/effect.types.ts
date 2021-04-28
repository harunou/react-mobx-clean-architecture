export interface Effect<A = unknown, R = unknown> {
    execute(args: A): R;
}

export interface CancellableEffect<A = unknown, R = unknown>
    extends Effect<A, R> {
    cancel(): void;
}

export interface EffectMakeParams<S, R> {
    store: S;
    persistence: R;
}

export interface EffectConstructor<S, R, E> {
    make(params: EffectMakeParams<S, R>): E;
}

export interface EffectInteractionBuilder<S, R, E> {
    build(state: S, persistence: R): E;
}
