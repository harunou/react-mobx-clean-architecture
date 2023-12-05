import { renderHook, act } from '@testing-library/react';
import { observable, action, makeObservable } from 'mobx';
import { ObservabilityTester } from 'src/utils/testing';
import { useLocalAdapter } from './useLocalAdapter';

class Counter {
    @observable
    value = 0;
    constructor(init: number) {
        makeObservable(this);
        this.value = init;
    }

    @action
    setValue(value: number): void {
        this.value = value;
    }
}

describe(`${useLocalAdapter.name}`, () => {
    let observabilityTester: ObservabilityTester<number>;
    beforeEach(() => {
        observabilityTester = ObservabilityTester.make();
    });
    afterEach(() => {
        observabilityTester.dispose();
    });
    it('decorates an object property with computed', () => {
        const counter = new Counter(3);
        const { result } = renderHook(() =>
            useLocalAdapter(() => {
                return {
                    get countMultiplyByTwo(): number {
                        return counter.value * 2;
                    },
                };
            }),
        );

        observabilityTester.watch(() => result.current.countMultiplyByTwo);

        counter.setValue(4);

        expect(observabilityTester.result).toEqual([6, 8]);
    });

    it('decorates an object method with action', () => {
        const counter = new Counter(3);
        const { result } = renderHook(() =>
            useLocalAdapter(() => {
                return {
                    increment(): void {
                        counter.setValue(counter.value + 1);
                        counter.setValue(counter.value + 1);
                    },
                };
            }),
        );

        observabilityTester.watch(() => counter.value);

        act(() => {
            result.current.increment();
        });

        expect(observabilityTester.result).toEqual([3, 5]);
    });

    it('returns same object each render', () => {
        const { result, rerender } = renderHook(() =>
            useLocalAdapter(() => {
                return {
                    count: 0,
                };
            }),
        );
        const object0 = result.current;
        rerender();
        const object1 = result.current;

        expect(object0).toBe(object1);
    });
});
