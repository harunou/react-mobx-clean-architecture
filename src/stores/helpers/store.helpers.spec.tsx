import { renderHook } from '@testing-library/react-hooks';
import assert from 'assert';
import { FC } from 'react';
import {
    container,
    DependencyContainer,
    injectable,
    InjectionToken
} from 'tsyringe';
import { Registry } from './registry/registry';
import {
    makeContainerProvider,
    makeInjectionToken,
    makeRootContainer,
    makeUseAdapterHook,
    makeUseRegistryHook
} from './store.helpers';
import {
    ContainerProvider,
    MountedHook,
    UnmountedHook,
    UseAdapterHook,
    UseContainerHook,
    UseRegistryHook
} from './store.types';

@injectable()
class Store {
    count = 5;
}

@injectable()
class Controller implements MountedHook, UnmountedHook {
    static ctorRuns = 0;
    private c = 'controller';
    constructor(public store: Store) {
        Controller.ctorRuns += 1;
    }
    mounted = jest.fn();
    unmounted = jest.fn();
}

@injectable()
class Presenter {
    private c = 'presenter';
}

describe(`${makeRootContainer.name}`, () => {
    let TOKEN: InjectionToken<number>;
    let rootContainer: DependencyContainer;
    let registry: Registry;
    beforeEach(() => {
        TOKEN = makeInjectionToken('token');
        registry = Registry.make().add({
            token: TOKEN,
            useValue: 5
        });
        rootContainer = makeRootContainer(registry);
    });
    afterEach(() => {
        rootContainer.reset();
        container.reset();
    });
    it('creates child of global container', () => {
        expect(container === rootContainer).toEqual(false);
    });
    it('creates container with injected registry', () => {
        expect(container.isRegistered(TOKEN)).toEqual(false);
        expect(rootContainer.isRegistered(TOKEN)).toEqual(true);
    });
});

describe(`UseAdapterHook`, () => {
    let child: DependencyContainer;
    let registry: Registry;
    let useAdapter: UseAdapterHook;
    beforeEach(() => {
        registry = Registry.make()
            .add({
                token: Store,
                useClass: Store
            })
            .add({
                token: Controller,
                useClass: Controller
            });
        child = container.createChildContainer();
        registry.forwardTo(child);
        useAdapter = makeUseAdapterHook(child);
    });
    afterEach(() => {
        container.reset();
    });
    it('creates adapter instance', () => {
        const { result } = renderHook(() => useAdapter(Controller));

        expect(result.current).toBeInstanceOf(Controller);
    });
    it('creates adapter once', () => {
        const { result, rerender } = renderHook(() => useAdapter(Controller));

        rerender();

        const [first, second] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));

        expect(first).toBeInstanceOf(Controller);
        expect(second).toBeInstanceOf(Controller);
        expect(first === second).toEqual(true);
    });
    it('runs mounted hook once', () => {
        const { result, rerender, unmount } = renderHook(() =>
            useAdapter(Controller)
        );

        rerender();
        unmount();

        expect(result.current.mounted).toBeCalledTimes(1);
    });
    it('runs unmounted hook once', () => {
        const { result, rerender, unmount } = renderHook(() =>
            useAdapter(Controller)
        );

        rerender();
        unmount();

        expect(result.current.unmounted).toBeCalledTimes(1);
    });
});

describe(`useRegistryHook`, () => {
    let registry0: Registry;
    let registry1: Registry;
    let useRegistry: UseRegistryHook;
    beforeEach(() => {
        registry0 = Registry.make().add({
            token: Store,
            useClass: Store
        });
        registry1 = Registry.make();
        useRegistry = makeUseRegistryHook(container);
    });
    afterEach(() => {
        container.reset();
    });
    it('creates child container', () => {
        const { result, rerender } = renderHook(
            (props) => useRegistry(props.registry),
            {
                initialProps: { registry: registry0 }
            }
        );

        rerender();
        rerender({ registry: registry1 });

        const [first, second, third] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));
        assert(!(third instanceof Error));

        expect(first.container !== container).toEqual(true);
        expect(second.container !== container).toEqual(true);
        expect(third.container !== container).toEqual(true);

        expect(first.container === second.container).toEqual(true);
        expect(first.container !== third.container).toEqual(true);
    });
    it('creates useAdapter hook', () => {
        const { result, rerender } = renderHook(
            (props) => useRegistry(props.registry),
            {
                initialProps: { registry: registry0 }
            }
        );
        rerender();
        rerender({ registry: registry1 });

        const [first, second, third] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));
        assert(!(third instanceof Error));

        expect(typeof first.useAdapter === 'function').toEqual(true);
        expect(typeof second.useAdapter === 'function').toEqual(true);
        expect(typeof third.useAdapter === 'function').toEqual(true);

        expect(first.useAdapter === second.useAdapter).toEqual(true);
        expect(first.useAdapter !== third.useAdapter).toEqual(true);
    });
    it('resets child container when component unmounted', () => {
        container.register(Presenter, Presenter);
        const { result, unmount } = renderHook(
            (props) => useRegistry(props.registry),
            {
                initialProps: { registry: registry0 }
            }
        );

        expect(result.current.container.isRegistered(Store)).toEqual(true);
        expect(container.isRegistered(Presenter)).toEqual(true);

        unmount();

        expect(result.current.container.isRegistered(Controller)).toEqual(
            false
        );
        expect(container.isRegistered(Presenter)).toEqual(true);
    });
});

describe(`makeUseContainerHook`, () => {
    let rootRegistry: Registry;
    let featureRegistry: Registry;
    let Provider: ContainerProvider;
    let useContainerHook: UseContainerHook;
    let container0: DependencyContainer;
    let container1: DependencyContainer;

    const wrapper: FC<{ container: DependencyContainer }> = ({
        children,
        container
    }) => <Provider container={container}>{children}</Provider>;

    beforeEach(() => {
        Controller.ctorRuns = 0;
        rootRegistry = Registry.make().add({
            token: Store,
            useClass: Store
        });
        featureRegistry = Registry.make().add({
            token: Controller,
            useClass: Controller
        });
        [Provider, useContainerHook] = makeContainerProvider();
        container0 = makeRootContainer(rootRegistry);
        container1 = makeRootContainer(rootRegistry);
    });
    afterEach(() => {
        container.reset();
        container0.reset();
        container1.reset();
    });

    it('extracts container from context and allows to create instance of adapter', () => {
        const { result } = renderHook(
            () => {
                const { useRegistry } = useContainerHook();
                const { useAdapter } = useRegistry(featureRegistry);
                const controller = useAdapter(Controller);
                return controller;
            },
            {
                wrapper,
                initialProps: {
                    container: container0
                }
            }
        );

        expect(result.current).toBeInstanceOf(Controller);
    });

    it('returns same hooks and adapter on rerender', () => {
        const { result, rerender } = renderHook(
            () => {
                const {
                    useRegistry,
                    container: contextContainer
                } = useContainerHook();
                const { useAdapter, container: featureContainer } = useRegistry(
                    featureRegistry
                );
                const controller = useAdapter(Controller);
                return {
                    useRegistry,
                    useAdapter,
                    controller,
                    contextContainer,
                    featureContainer
                };
            },
            {
                wrapper,
                initialProps: {
                    container: container0
                }
            }
        );

        rerender();

        const [first, second] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));

        expect(first.useRegistry === second.useRegistry).toEqual(true);
        expect(first.useAdapter === second.useAdapter).toEqual(true);
        expect(first.controller === second.controller).toEqual(true);
        expect(first.contextContainer === second.contextContainer).toEqual(
            true
        );
        expect(first.featureContainer === second.featureContainer).toEqual(
            true
        );
        expect(Controller.ctorRuns).toEqual(1);
    });

    it('returns new hooks and adapter on rerender', () => {
        const { result, rerender } = renderHook(
            () => {
                const {
                    useRegistry,
                    container: contextContainer
                } = useContainerHook();
                const { useAdapter, container: featureContainer } = useRegistry(
                    featureRegistry
                );
                const controller = useAdapter(Controller);
                return {
                    useRegistry,
                    useAdapter,
                    controller,
                    contextContainer,
                    featureContainer
                };
            },
            {
                wrapper,
                initialProps: {
                    container: container0
                }
            }
        );

        rerender({ container: container1 });

        const [first, second] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));

        expect(first.useRegistry !== second.useRegistry).toEqual(true);
        expect(first.useAdapter !== second.useAdapter).toEqual(true);
        expect(first.controller !== second.controller).toEqual(true);
        expect(first.contextContainer !== second.contextContainer).toEqual(
            true
        );
        expect(first.featureContainer !== second.featureContainer).toEqual(
            true
        );
        expect(Controller.ctorRuns).toEqual(2);
    });
});
