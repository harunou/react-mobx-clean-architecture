import assert from 'assert';
import { flow } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { computedFn } from 'mobx-utils';
import { CancellablePromise } from 'mobx/dist/internal';
import { Context, createContext, useContext, useEffect, useState } from 'react';

export const selector = computedFn;
export const effect = flow;
export const FLOW_CANCELLED = 'FLOW_CANCELLED';

export function makeCancellablePromiseStub(): CancellablePromise<never> {
    const f = flow(function* generator() {
        /* noop */
    });
    return f() as CancellablePromise<never>;
}

export const makeStoreContext = <T>(): readonly [Context<T>, () => T] => {
    const StoreContext = createContext<T | undefined>(undefined) as Context<T>;
    const useContextStore = (): T => {
        const contextStore = useContext(StoreContext);
        assert(
            contextStore,
            'StoreContext: no value was provided for StoreContext.Provider'
        );
        return contextStore;
    };
    return [StoreContext, useContextStore] as const;
};

export const useStore = <T>(fn: () => T): T => {
    const [store] = useState(fn);
    return store;
};

export const useAdapter = useLocalObservable;

export const useMountedHook = (fn: () => void): void => {
    useEffect(fn, []);
};

export const useUnMountedHook = (fn: () => void): void => {
    useEffect(() => {
        return fn;
    }, []);
};
