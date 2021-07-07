import { renderHook } from '@testing-library/react-hooks';
import { useMountedHook, useUnMountedHook } from './stores.helpers';

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
