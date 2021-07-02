import { flow } from 'mobx';
import { computedFn } from 'mobx-utils';
import { CancellablePromise } from 'mobx/dist/internal';
import { Context, useContext, useEffect, useMemo } from 'react';
import { CounterStore } from './domain/counter/counter.store';
import { CounterSourceStore } from './persistence/counter-source/counter-source.store';
import { RootStore } from './root/root.store';
import { UseAdapterHook } from './stores.types';

export const selector = computedFn;
export const effect = flow;

export function makeCancellablePromiseStub(): CancellablePromise<never> {
    const f = flow(function* generator() {
        /* noop */
    });
    return f() as CancellablePromise<never>;
}

export function useStore<T>(
    context: Context<T>
): { store: T; useAdapter: UseAdapterHook<T> } {
    const store = useContext(context);
    const useAdapter = useMemo(() => makeUseAdapterHook(store), [store]);
    return {
        store,
        useAdapter
    };
}

export function makeUseAdapterHook<T>(store: T): UseAdapterHook<T> {
    return function useAdapterHook<R>(adapterFunction: (store: T) => R): R {
        const adapter = useMemo(() => adapterFunction(store), [store]);
        return adapter;
    };
}

export function useMountedHook(fn: () => void): void {
    useEffect(fn, []);
}

export function useUnMountedHook(fn: () => void): void {
    useEffect(() => {
        return fn;
    }, []);
}

export const sliceCounterStore = (rootStore: RootStore): CounterStore => {
    return rootStore.domain.counter;
};

export const sliceCounterSourceStore = (
    rootStore: RootStore
): CounterSourceStore => {
    return rootStore.persistence.counterSource;
};
