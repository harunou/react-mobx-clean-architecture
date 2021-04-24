import assert from 'assert';
import React, { createContext, useContext, useState } from 'react';
import { AdapterConstructor, UseAdapter } from './context.types';

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

const makeStoreUseAdapter = <S>(context: React.Context<S | undefined>) => {
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
        return { controller, presenter };
    };
};

const assertContextNonNullableCasting = <S>(
    c: React.Context<S>
): React.Context<NonNullable<S>> => {
    return (c as unknown) as React.Context<NonNullable<S>>;
};
