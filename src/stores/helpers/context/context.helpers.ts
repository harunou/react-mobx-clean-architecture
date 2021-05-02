import assert from 'assert';
import { Context, createContext, useContext, useEffect, useState } from 'react';
import {
    AdapterConstructor,
    UnmountedHook,
    MountedHook,
    UseAdapter
} from './context.types';

export const makeContext = <S>(): {
    RootStoreContext: Context<NonNullable<S>>;
    useAdapter: UseAdapter<S>;
} => {
    const rootStoreContext = createContext<S | undefined>(undefined);

    const useAdapter = makeStoreUseAdapter<S>(rootStoreContext);

    return {
        RootStoreContext: assertContextNonNullableCasting(rootStoreContext),
        useAdapter
    };
};

export const makeStoreUseAdapter = <S>(context: Context<S | undefined>) => {
    return function useAdapter<C, P>(
        ControllerConstructor: AdapterConstructor<S, C>,
        PresenterConstructor: AdapterConstructor<S, P>
    ): { controller: C; presenter: P } {
        const store = useContext(context);
        assert(
            store,
            'UseAdapter: root store context can not be undefined, check if context is set up correctly'
        );
        const [controller] = useState(() => new ControllerConstructor(store));
        const [presenter] = useState(() => new PresenterConstructor(store));

        useEffect(() => {
            if (hasMountedHook(controller)) {
                controller.mounted();
            }
            return () => {
                if (hasUnmountedHook(controller)) {
                    controller.unmounted();
                }
            };
        }, []);

        return { controller, presenter };
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasMountedHook = (c: any): c is MountedHook => {
    return typeof c.unmounted === 'function';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasUnmountedHook = (c: any): c is UnmountedHook => {
    return typeof c.mounted === 'function';
};

const assertContextNonNullableCasting = <S>(
    c: Context<S>
): React.Context<NonNullable<S>> => {
    return (c as unknown) as React.Context<NonNullable<S>>;
};
