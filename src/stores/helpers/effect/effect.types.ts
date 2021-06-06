export interface Effect<A = unknown, R = unknown> {
    execute(args: A): R;
}

export interface CancellableEffect<A = unknown, R = unknown>
    extends Effect<A, R> {
    cancel(): void;
}
