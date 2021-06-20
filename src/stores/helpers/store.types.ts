import { FC } from 'react';
import { DependencyContainer, InjectionToken } from 'tsyringe';
import { Registry } from './registry/registry';

export type ContainerProvider = FC<{ container: DependencyContainer }>;

export type UseContainerHook = () => {
    container: DependencyContainer;
    useRegistry: UseRegistryHook;
};

export type UseRegistryHook = (
    registry: Registry
) => { container: DependencyContainer; useAdapter: UseAdapterHook };

export type UseAdapterHook = <T = unknown>(token: InjectionToken<T>) => T;

export interface AdapterConstructor<S, A> {
    new (rootStore: S): A;
}

export type UseAdapter<S> = <C, P>(
    ControllerConstructor: AdapterConstructor<S, C>,
    PresenterConstructor: AdapterConstructor<S, P>
) => {
    controller: C;
    presenter: P;
};

export interface MountedHook {
    mounted(): void;
}

export interface UnmountedHook {
    unmounted(): void;
}
