import { renderHook, act } from '@testing-library/react';
import { ObservabilityTester } from 'src/utils/testing';
import { useObservableState } from './useObservableState';

describe('useObservableState', () => {
    let observabilityTester: ObservabilityTester<number>;
    beforeEach(() => {
        observabilityTester = ObservabilityTester.make();
    });
    afterEach(() => {
        observabilityTester.dispose();
    });
    it('starts with the provided initial value', () => {
        const initialValue = 10;
        const { result } = renderHook(() => useObservableState(initialValue));

        expect(result.current.value).toBe(initialValue);
    });

    it('updates the value when setValue is called', () => {
        const initialValue = 10;
        const { result } = renderHook(() => useObservableState(initialValue));
        const newValue = 20;

        observabilityTester.watch(() => result.current.value);

        act(() => {
            result.current.setValue(newValue);
        });

        expect(result.current.value).toBe(newValue);
        expect(observabilityTester.result).toStrictEqual([initialValue, newValue]);
    });

    it('does not trigger observer if the new value is the same as the current value', () => {
        const initialValue = 10;
        const { result } = renderHook(() => useObservableState(initialValue));

        observabilityTester.watch(() => result.current.value);

        act(() => {
            result.current.setValue(initialValue);
        });

        expect(observabilityTester.result).toStrictEqual([initialValue]);
    });

    it('triggers an observer once set value is called', () => {
        const initialValue = 10;
        const { result } = renderHook(() => useObservableState(initialValue));

        observabilityTester.watch(() => result.current.value);

        act(() => {
            result.current.setValue(30);
            result.current.setValue(40);
        });

        expect(observabilityTester.result).toStrictEqual([10, 30, 40]);
    });

    it('trigger an observer once initial value has changed after rerender', () => {
        const initialValue = 10;
        const { result, rerender } = renderHook((value) => useObservableState(value, [value]), {
            initialProps: initialValue,
        });

        observabilityTester.watch(() => result.current.value);

        const newValue = 20;
        rerender(newValue);

        expect(observabilityTester.result).toStrictEqual([initialValue, newValue]);
    });

    it('does not trigger an observer once initial value is not in the hook dependency', () => {
        const initialValue = 10;
        const { result, rerender } = renderHook((value) => useObservableState(value), {
            initialProps: initialValue,
        });

        observabilityTester.watch(() => result.current.value);

        const newValue = 20;
        rerender(newValue);

        expect(observabilityTester.result).toStrictEqual([10]);
    });
});
