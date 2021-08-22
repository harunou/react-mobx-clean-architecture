export type UseCase<T = unknown> = unknown extends T
    ? () => void
    : (payload: T) => void;
