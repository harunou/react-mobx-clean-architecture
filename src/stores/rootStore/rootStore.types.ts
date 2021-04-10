import { Builder, Selector, UseCase } from '../helpers/stores.types';

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
