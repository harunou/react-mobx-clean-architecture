import { UseAdapterHook } from '@stores/stores.types';
import { renderHook } from '@testing-library/react-hooks';
import assert from 'assert';
import { makeUseAdapterHook } from './stores.helpers';

class Store {
    private type = 'store';
    public value = 5;
}
const adapter = (store: Store): { value: number } => {
    return { value: store.value };
};

describe(`UseAdapterHook`, () => {
    let useAdapter: UseAdapterHook<Store>;
    let store: Store;
    beforeEach(() => {
        store = new Store();
        useAdapter = makeUseAdapterHook(store);
    });
    it('creates adapter instance', () => {
        const { result } = renderHook(() => useAdapter(adapter));

        expect(result.current.value).toEqual(store.value);
    });
    it('creates adapter once each render cycle', () => {
        const { result, rerender } = renderHook(() => useAdapter(adapter));

        rerender();

        const [first, second] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));

        expect(first.value).toEqual(store.value);
        expect(second.value).toEqual(store.value);
        expect(first === second).toEqual(true);
    });
});
