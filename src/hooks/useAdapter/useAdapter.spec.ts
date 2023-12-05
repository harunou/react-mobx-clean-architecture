import { renderHook } from '@testing-library/react';
import { useAdapter } from './useAdapter';

class Store {
    static constructorRuns = 0;
    static create(): Store {
        return new Store();
    }
    private readonly value = 0;
    constructor() {
        Store.constructorRuns += 1;
    }
    getValue(): number {
        return this.value;
    }
}

describe(`${useAdapter.name}`, () => {
    beforeEach(() => {
        Store.constructorRuns = 0;
    });
    it('creates store once each render cycle', () => {
        const { result, rerender } = renderHook(() => useAdapter(() => Store.create()));
        const first = result.current;

        rerender();
        const second = result.current;

        rerender();
        const third = result.current;

        expect(first === second && first === third).toEqual(true);
    });
    it('runs constructor once', () => {
        const { rerender } = renderHook(() => useAdapter(() => Store.create()));

        rerender();
        rerender();

        expect(Store.constructorRuns).toEqual(1);
    });
});
