import { FC } from 'react';
import { DependencyContainer, InjectionToken } from 'tsyringe';
import { Registry } from './registry/registry';

export interface AbstractType<T> extends Function {
    prototype: T;
}

export interface Selector<R = unknown> {
    result: R;
}

export interface SelectorWithProps<R = unknown, P = unknown>
    extends Selector<R> {
    withProps(...props: P[]): this;
}

export interface UseCase<P = unknown> {
    execute(...props: P[]): void;
}

export interface Effect<A = unknown, R = unknown> {
    execute(args: A): R;
}

export interface CancellableEffect<A = unknown, R = unknown>
    extends Effect<A, R> {
    cancel(): void;
}

export type ContainerProvider = FC<{ container: DependencyContainer }>;

export type UseContainerHook = () => {
    container: DependencyContainer;
    useRegistry: UseRegistryHook;
};

export type UseRegistryHook = (
    registry: Registry
) => { container: DependencyContainer; useAdapter: UseAdapterHook };

export type UseAdapterHook = <T = unknown>(token: InjectionToken<T>) => T;

export interface MountedHook {
    mounted(): void;
}

export interface UnmountedHook {
    unmounted(): void;
}
