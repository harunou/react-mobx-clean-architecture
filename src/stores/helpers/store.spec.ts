import { renderHook } from '@testing-library/react-hooks';
import assert from 'assert';
import {
    container,
    DependencyContainer,
    injectable,
    InjectionToken
} from 'tsyringe';
import { Registry } from './registry/registry';
import {
    makeInjectionToken,
    makeRootContainer,
    makeUseAdapterHook,
    makeUseRegistryHook
} from './store.helpers';
import {
    MountedHook,
    UnmountedHook,
    UseAdapterHook,
    UseRegistryHook
} from './store.types';

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

@injectable()
class Store {
    count = 5;
}

@injectable()
class Controller implements MountedHook, UnmountedHook {
    private c = 'controller';
    constructor(public store: Store) {}
    mounted = jest.fn();
    unmounted = jest.fn();
}

@injectable()
class Presenter {
    private c = 'presenter';
}

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
