import assert from 'assert';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    AdapterConstructor,
    OnDestroy,
    OnInit,
    UseAdapter
} from './context.types';

export const makeContext = <S>(): {
    RootStoreContext: React.Context<NonNullable<S>>;
    useAdapter: UseAdapter<S>;
} => {
    const rootStoreContext = createContext<S | undefined>(undefined);

    const useAdapter = makeStoreUseAdapter<S>(rootStoreContext);

    return {
        RootStoreContext: assertContextNonNullableCasting(rootStoreContext),
        useAdapter
    };
};

export const makeStoreUseAdapter = <S>(
    context: React.Context<S | undefined>
) => {
    return function useAdapter<C, P>(
        ControllerConstructor: AdapterConstructor<S, C>,
        PresenterConstructor: AdapterConstructor<S, P>
    ): { controller: C; presenter: P } {
        const store = useContext(context);
        assert(
            store,
            'UseAdapter: root store context can not be undefined, check if context is set up correctly'
        );
        const [controller] = useState(new ControllerConstructor(store));
        const [presenter] = useState(new PresenterConstructor(store));

        useEffect(() => {
            if (hasOnInitHook(controller)) {
                controller.onInit();
            }
            return () => {
                if (hasOnDestroyHook(controller)) {
                    controller.onDestroy();
                }
            };
        }, []);

        return { controller, presenter };
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasOnInitHook = (c: any): c is OnInit => {
    return typeof c.onInit === 'function';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasOnDestroyHook = (c: any): c is OnDestroy => {
    return typeof c.onDestroy === 'function';
};

const assertContextNonNullableCasting = <S>(
    c: React.Context<S>
): React.Context<NonNullable<S>> => {
    return (c as unknown) as React.Context<NonNullable<S>>;
};
