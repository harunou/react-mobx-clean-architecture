export type Action<T = unknown> = unknown extends T
    ? () => void
    : (payload: T) => void;
