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
    makeUseAdapterHook
} from './store.helpers';
import { MountedHook, UnmountedHook, UseAdapterHook } from './store.types';

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
        registry.forwardTo(container);
        useAdapter = makeUseAdapterHook(child);
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
