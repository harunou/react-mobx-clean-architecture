import {
    Selector,
    SelectorBuilder,
    UseCase,
    UseCaseBuilder
} from '../helpers/stores.types';

export interface StoreQuery<S> {
    query(builder: SelectorBuilder<S>): Selector;
}

export interface StoreExecuter<S, P> {
    execute(builder: UseCaseBuilder<S, P>): void;
}

export type StoreFacade<S, P> = StoreQuery<S> & StoreExecuter<S, P>;
