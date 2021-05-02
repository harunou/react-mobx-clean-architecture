import { AppState } from '@stores/app/app.types';
import { fireEvent, render } from '@testing-library/react';
import { Counter, counterTestIds } from './counter';
import { RootStore, RootStoreContext } from '@stores/root/root.store';
import { httpClient } from '@core/http-client';
import assert from 'assert';
import { Count } from './adapter/selectors/count/count.selector';
import { COUNTER_SAVE_COUNT_ENDPOINT } from '@api/counter.service';
import { MultiplyCount } from './adapter/selectors/multiply-count/multiply-count.selector';

describe(`${Counter.name}`, () => {
    const count = 3;
    const initial: AppState = {
        counter: {
            $count: count
        }
    };
    let rootStore: RootStore;

    beforeEach(() => {
        rootStore = RootStore.make(initial);
        Count.runs = 0;
        MultiplyCount.runs = 0;
    });

    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });

    it('renders without errors', () => {
        expect(() =>
            render(
                <RootStoreContext.Provider value={rootStore}>
                    <Counter />
                </RootStoreContext.Provider>
            )
        ).not.toThrow();
    });

    it('increments store and renders result', () => {
        const sut = (
            <RootStoreContext.Provider value={rootStore}>
                <Counter />
            </RootStoreContext.Provider>
        );
        const { queryByTestId, rerender } = render(sut);

        const button = queryByTestId(counterTestIds.add_1_button);
        assert(button);
        const selectCount = queryByTestId(counterTestIds.selectCount);
        assert(selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyCount
        );
        assert(selectMultiplyCount);

        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);

        expect(selectCount).toHaveTextContent(`${count + 3}`);
        expect(selectMultiplyCount).toHaveTextContent(`${(count + 3) * 10}`);
        expect(Count.runs).toEqual(4);
        expect(MultiplyCount.runs).toEqual(4);

        rerender(sut);

        expect(selectCount).toHaveTextContent(`${count + 3}`);
        expect(Count.runs).toEqual(4);
        expect(MultiplyCount.runs).toEqual(4);
    });

    it('increments store, saves optimistic and renders result', () => {
        const sut = (
            <RootStoreContext.Provider value={rootStore}>
                <Counter />
            </RootStoreContext.Provider>
        );
        const { queryByTestId } = render(sut);

        const button = queryByTestId(
            counterTestIds.add_1_andSaveOptimisticButton
        );
        assert(button);
        const selectCount = queryByTestId(counterTestIds.selectCount);
        assert(selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyCount
        );
        assert(selectMultiplyCount);

        fireEvent.click(button);
        httpClient.match(COUNTER_SAVE_COUNT_ENDPOINT).resolve(count + 1);

        fireEvent.click(button);
        httpClient.match(COUNTER_SAVE_COUNT_ENDPOINT).resolve(count + 2);

        expect(selectCount).toHaveTextContent(`${count + 2}`);
        expect(selectMultiplyCount).toHaveTextContent(`${(count + 2) * 10}`);
        expect(Count.runs).toEqual(3);
        expect(MultiplyCount.runs).toEqual(3);
    });
});
