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
import { Context, createContext, useContext, useEffect, useState } from 'react';
import { Registry } from './registry/registry';

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

export function makeContainerProvider(): [ContainerProvider, UseContainerHook] {
    const Context: Context<DependencyContainer> = createContext(
        container.createChildContainer()
    );

    return [
        makeContentProviderComponent(Context),
        makeUseContainerHook(Context)
    ];
}

export function makeContentProviderComponent(
    Context: Context<DependencyContainer>
): ContainerProvider {
    const Provider: ContainerProvider = ({ registry, children }) => {
        registry.forwardTo(container);
        return (
            <Context.Provider value={container}>{children}</Context.Provider>
        );
    };
    return Provider;
}

export function makeUseContainerHook(
    context: Context<DependencyContainer>
): UseContainerHook {
    const useContainer: UseContainerHook = () => {
        const container = useContext(context);
        const useRegistry = makeUseRegistryHook(
            container.createChildContainer()
        );
        return { container, useRegistry };
    };
    return useContainer;
}

export function makeUseRegistryHook(
    container: DependencyContainer
): UseRegistryHook {
    const useRegistry: UseRegistryHook = (registry: Registry) => {
        registry.forwardTo(container);
        return {
            container,
            useAdapter: makeUseAdapterHook(container)
        };
    };
    // useEffect(() => {
    //     return () => container.reset();
    // }, []);
    return useRegistry;
}

export function makeUseAdapterHook(
    container: DependencyContainer
): UseAdapterHook {
    return function useAdapter<T>(token: InjectionToken<T>): T {
        const [adapter] = useState(() => container.resolve(token));

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasMountedHook = (c: any): c is MountedHook => {
    return typeof c.unmounted === 'function';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasUnmountedHook = (c: any): c is UnmountedHook => {
    return typeof c.mounted === 'function';
};
