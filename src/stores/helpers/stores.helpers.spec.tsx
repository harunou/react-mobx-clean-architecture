import { UseAdapterHook } from '@stores/stores.types';
import { renderHook } from '@testing-library/react-hooks';
import assert from 'assert';
import { createContext, FC } from 'react';
import {
    makeUseAdapterHook,
    useMountedHook,
    useStore,
    useUnMountedHook
} from './stores.helpers';

class Store {
    private type = 'store';
    constructor(public value: number) {}
}
const adapter = (store: Store): { value: number } => {
    return { value: store.value };
};

describe(`useAdapterHook`, () => {
    let initial: number;
    let store: Store;
    let useAdapter: UseAdapterHook<Store>;
    beforeEach(() => {
        initial = 5;
        store = new Store(initial);
        useAdapter = makeUseAdapterHook(store);
    });
    it('creates adapter instance', () => {
        const { result } = renderHook(() => useAdapter(adapter));

        expect(result.current.value).toEqual(initial);
    });
    it('creates adapter once each render cycle', () => {
        const { result, rerender } = renderHook(() => useAdapter(adapter));

        rerender();

        const [first, second] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));

        expect(first.value).toEqual(initial);
        expect(second.value).toEqual(initial);
        expect(first === second).toEqual(true);
    });
});

describe(`useStoreHook`, () => {
    let initial: number;
    let store: Store;
    const StoreContext = createContext({} as Store);

    beforeEach(() => {
        initial = 3;
        store = new Store(initial);
    });

    it('extracts store from context and allows to create instance of adapter', () => {
        const wrapper: FC<{ store: Store }> = ({ store, children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        );
        const { result } = renderHook(
            () => {
                const { useAdapter } = useStore(StoreContext);
                const storeAdapter = useAdapter(adapter);
                return storeAdapter;
            },
            {
                wrapper,
                initialProps: {
                    store
                }
            }
        );

        expect(result.current.value).toEqual(initial);
    });

    it('returns same hooks and adapter on rerender', () => {
        const wrapper: FC<{ store: Store }> = ({ store, children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        );
        const { result, rerender } = renderHook(
            () => {
                const { useAdapter, store: contextStore } = useStore(
                    StoreContext
                );
                const storeAdapter = useAdapter(adapter);
                return {
                    useAdapter,
                    contextStore,
                    storeAdapter
                };
            },
            {
                wrapper,
                initialProps: {
                    store
                }
            }
        );

        rerender();

        const [first, second] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));

        expect(first.useAdapter === second.useAdapter).toEqual(true);
        expect(first.contextStore === second.contextStore).toEqual(true);
        expect(first.storeAdapter === second.storeAdapter).toEqual(true);
    });

    it('returns new hooks and adapter on rerender when store changed', () => {
        const wrapper: FC<{ store: Store }> = ({ store, children }) => (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        );
        const { result, rerender } = renderHook(
            () => {
                const { useAdapter, store: contextStore } = useStore(
                    StoreContext
                );
                const storeAdapter = useAdapter(adapter);
                return {
                    useAdapter,
                    contextStore,
                    storeAdapter
                };
            },
            {
                wrapper,
                initialProps: {
                    store
                }
            }
        );

        const updateInitial = 7;
        const updatedStore = new Store(updateInitial);

        rerender({ store: updatedStore });

        const [first, second] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));

        expect(first.useAdapter !== second.useAdapter).toEqual(true);
        expect(first.contextStore !== second.contextStore).toEqual(true);
        expect(first.storeAdapter !== second.storeAdapter).toEqual(true);
    });
});

describe(`${useMountedHook.name}`, () => {
    it('run once when component mounted', () => {
        const mounted = jest.fn();
        const { rerender, unmount } = renderHook(() => useMountedHook(mounted));

        rerender();
        unmount();

        expect(mounted).toBeCalledTimes(1);
    });
});

describe(`${useUnMountedHook.name}`, () => {
    it('run once when component unmounted', () => {
        const unmounted = jest.fn();
        const { rerender, unmount } = renderHook(() =>
            useUnMountedHook(unmounted)
        );

        rerender();
        unmount();

        expect(unmounted).toBeCalledTimes(1);
    });
});
