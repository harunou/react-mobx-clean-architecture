import { flow, observable } from 'mobx';
import { computedFn } from 'mobx-utils';
import { AnnotationsMap, CancellablePromise } from 'mobx/dist/internal';
import { Context, useContext, useEffect, useMemo } from 'react';
import { UseAdapterHook, UseStoreHook } from './stores.types';

export const selector = computedFn;
export const effect = flow;
export const FLOW_CANCELLED = 'FLOW_CANCELLED';

export function makeCancellablePromiseStub(): CancellablePromise<never> {
    const f = flow(function* generator() {
        /* noop */
    });
    return f() as CancellablePromise<never>;
}

export function useStore<T>(context: Context<T>): UseStoreHook<T> {
    const store = useContext(context);
    const useAdapter = useMemo(() => makeUseAdapterHook(store), [store]);
    return {
        store,
        useAdapter
    };
}

export function makeUseAdapterHook<T>(store: T): UseAdapterHook<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function useAdapterHook<R extends Record<string, any>>(
        adapterFunction: (store: T) => R,
        annotations?: AnnotationsMap<R, never>
    ): R {
        const adapter = useMemo(
            () =>
                observable(adapterFunction(store), annotations, {
                    autoBind: true
                }),
            [store]
        );
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
