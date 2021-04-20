import assert from 'assert';
import React, { createContext, useContext } from 'react';
import { AdapterConstructor, UseAdapter } from './context.types';

export const makeContext = <S>(): {
    RootStoreContext: React.Context<NonNullable<S>>;
    useAdapter: UseAdapter<S>;
} => {
    const RootStoreContext = createContext<S | undefined>(undefined);

    const useAdapter = <C, P>(
        ControllerConstructor: AdapterConstructor<S, C>,
        PresenterConstructor: AdapterConstructor<S, P>
    ): { controller: C; presenter: P } => {
        const store = useContext(RootStoreContext);
        assert(
            store,
            'UseAdapter: root store context can not be undefined, check if context is set up correctly'
        );
        const controller = new ControllerConstructor(store);
        const presenter = new PresenterConstructor(store);
        return { controller, presenter };
    };

    return {
        RootStoreContext: assertContextNonNullableCasting(RootStoreContext),
        useAdapter
    };
};

const assertContextNonNullableCasting = <S>(
    c: React.Context<S>
): React.Context<NonNullable<S>> => {
    return (c as unknown) as React.Context<NonNullable<S>>;
};
