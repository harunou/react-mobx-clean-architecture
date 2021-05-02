import { AppState } from '@stores/app/app.types';
import { fireEvent, render } from '@testing-library/react';
import { Counter, counterTestIds } from './counter';
import { RootStore, RootStoreContext } from '@stores/root/root.store';
import { httpClient } from '@core/http-client';
import assert from 'assert';
import { Count } from './adapter/selectors/count/count.selector';

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

        const add_1_button = queryByTestId(counterTestIds.add_1_button);
        assert(add_1_button);

        const selectCount = queryByTestId(counterTestIds.selectCount);
        assert(selectCount);

        fireEvent.click(add_1_button);
        fireEvent.click(add_1_button);
        fireEvent.click(add_1_button);

        expect(selectCount).toHaveTextContent(`${count + 3}`);
        expect(Count.runs).toEqual(4);

        rerender(sut);

        expect(selectCount).toHaveTextContent(`${count + 3}`);
        expect(Count.runs).toEqual(4);
    });
});
