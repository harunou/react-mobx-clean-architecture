import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { container, DependencyContainer, InjectionToken } from 'tsyringe';
import {
    ContainerProvider,
    MountedHook,
    UnmountedHook,
    UseAdapterHook,
    UseContainerHook,
    UseRegistryHook
} from './store.types';
import { Context, createContext, useContext, useEffect, useMemo } from 'react';
import { Registry } from './registry/registry';

export const FLOW_CANCELLED = 'FLOW_CANCELLED';

export function makeInjectionToken<T = unknown>(
    key: string
): InjectionToken<T> {
    return Symbol(key);
}

export function makeCancellablePromiseStub(): CancellablePromise<never> {
    const f = flow(function* generator() {
        /* noop */
    });
    return f() as CancellablePromise<never>;
}

export const makeRootContainer = (registry: Registry): DependencyContainer => {
    const rootContainer = container.createChildContainer();
    return registry.forwardTo(rootContainer);
};

export function makeContainerProvider(): [ContainerProvider, UseContainerHook] {
    const Context: Context<DependencyContainer> = createContext(
        container.createChildContainer()
    );

    return [
        makeContentProviderComponent(Context),
        makeUseContainerHook(Context)
    ];
}

export function makeUseContainerHook(
    context: Context<DependencyContainer>
): UseContainerHook {
    return function useContainerHook() {
        const container = useContext(context);
        const useRegistry = useMemo(() => makeUseRegistryHook(container), [
            container
        ]);
        return { container, useRegistry };
    };
}

export function makeUseRegistryHook(
    container: DependencyContainer
): UseRegistryHook {
    return function useRegistryHook(registry: Registry) {
        const containerWithRegistry = useMemo(
            () => registry.forwardTo(container.createChildContainer()),
            [registry, container]
        );

        useEffect(() => {
            return () => {
                containerWithRegistry.reset();
            };
        }, []);

        return {
            container: containerWithRegistry,
            useAdapter: useMemo(
                () => makeUseAdapterHook(containerWithRegistry),
                [containerWithRegistry]
            )
        };
    };
}

export function makeUseAdapterHook(
    container: DependencyContainer
): UseAdapterHook {
    return function useAdapterHook<T>(token: InjectionToken<T>): T {
        const adapter = useMemo(() => container.resolve(token), [
            container,
            token
        ]);

        useEffect(() => {
            if (hasMountedHook(adapter)) {
                adapter.mounted();
            }
            return () => {
                if (hasUnmountedHook(adapter)) {
                    adapter.unmounted();
                }
            };
        }, []);
        return adapter;
    };
}

export function makeContentProviderComponent(
    Context: Context<DependencyContainer>
): ContainerProvider {
    const Provider: ContainerProvider = ({ container, children }) => {
        return (
            <Context.Provider value={container}>{children}</Context.Provider>
        );
    };
    return Provider;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasMountedHook = (c: any): c is MountedHook => {
    return typeof c.unmounted === 'function';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasUnmountedHook = (c: any): c is UnmountedHook => {
    return typeof c.mounted === 'function';
};
