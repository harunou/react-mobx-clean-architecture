import { renderHook } from '@testing-library/react-hooks';
import assert from 'assert';
import { useMountedHook, useStore, useUnMountedHook } from './stores.helpers';

class Store {
    private value = 0;
}

describe(`${useStore.name}`, () => {
    it('creates store once each render cycle', () => {
        const { result, rerender } = renderHook(() =>
            useStore(() => new Store())
        );

        rerender();

        const [first, second] = result.all;
        assert(!(first instanceof Error));
        assert(!(second instanceof Error));
        expect(first === second).toEqual(true);
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
