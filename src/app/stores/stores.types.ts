export interface Builder<T, R> {
    build(state: T): R;
}

export interface StoreQuery<T> {
    query(builder: Builder<T, Selector>): QueryResponse;
}

export interface StoreExecuter<T> {
    execute(builder: Builder<T, UseCase>): void;
}

export type StoreFacade<T> = StoreQuery<T> & StoreExecuter<T>;

export interface QueryResponse {
    result: number;
}

export interface UseCase {
    execute(): void;
}

export interface Selector {
    result: number;
}
