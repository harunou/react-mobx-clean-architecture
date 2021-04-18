import { Selector } from '../store/store.types';

export interface SelectorMakeParams<S, P = unknown> {
    store: S;
    props: P | undefined;
}

export interface SelectorConstructor<S, P, R> {
    make(params: SelectorMakeParams<S, P>): Selector<R>;
}
