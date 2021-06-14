import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { Context, useContext } from 'react';
import { DependencyContainer, InjectionToken } from 'tsyringe';
import { Registry } from './registry/registry';

export const makeInjectionToken = <T = unknown>(
    key: string
): InjectionToken<T> => {
    return Symbol(key);
};

export const makeCancellablePromiseStub = (): CancellablePromise<never> => {
    const f = flow(function* generator() {
        /* noop */
    });
    return f() as CancellablePromise<never>;
};

export const useRegistry = (
    registry: Registry,
    context: Context<DependencyContainer>
): {
    container: DependencyContainer;
    useAdapter: <T>(token: InjectionToken<T>) => T;
} => {
    const parent = useContext(context);

    const child = parent.createChildContainer();
    registry.forwardTo(child);

    return {
        container: child,
        useAdapter: <T>(token: InjectionToken<T>) => child.resolve(token)
    };
};
