export interface Builder<S, R> {
    build(state: S): R;
}

export interface UseCase {
    execute(): void;
}

export interface Selector {
    result: number;
}
