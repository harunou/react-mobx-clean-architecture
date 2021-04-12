export interface Selector<R = unknown> {
    result: R;
}

export interface SelectorConstructor<S, P, R> {
    make(params: SelectorMakeParams<S, P>): Selector<R>;
}

export interface SelectorMakeParams<S, P = unknown> {
    store: S;
    props: P | undefined;
}

export interface SelectorBuilder<S, R> {
    build(state: S): Selector<R>;
}

export interface StoreQuery<S> {
    query<R>(builder: SelectorBuilder<S, R>): Selector<R>;
}
