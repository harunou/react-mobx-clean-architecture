import { AppState } from '@stores/app/app.types';
import { fireEvent, render, within } from '@testing-library/react';
import { Counter, counterTestIds } from './counter';
import { RootStore, RootStoreContext } from '@stores/root/root.store';
import { httpClient } from '@core/http-client';
import assert from 'assert';
import { Count } from './adapter/selectors/count/count.selector';
import {
    COUNTER_GET_COUNT_ENDPOINT,
    COUNTER_INCREMENT_ENDPOINT,
    COUNTER_SAVE_COUNT_ENDPOINT
} from '@api/counter.service';
import { MultiplyCount } from './adapter/selectors/multiply-count/multiply-count.selector';
import { sleep } from '@testing-tools/testing-tools.helpers';

describe(`${Counter.name}`, () => {
    let count: number;
    const initial: AppState = {
        counter: {
            $count: 0
        }
    };
    let rootStore: RootStore;
    let sut: JSX.Element;

    beforeEach(() => {
        count = 3;
        rootStore = RootStore.make(initial);
        sut = (
            <RootStoreContext.Provider value={rootStore}>
                <Counter />
            </RootStoreContext.Provider>
        );
        Count.runs = 0;
        MultiplyCount.runs = 0;
    });

    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });

    it('renders without errors', async () => {
        expect(() => render(sut)).not.toThrow();
        httpClient.clean();
    });

    it('inits store and renders initial result', async () => {
        const { queryByTestId, rerender } = render(sut);

        const selectCount = queryByTestId(counterTestIds.selectCount);
        assert(selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyCount
        );
        assert(selectMultiplyCount);

        expect(selectCount).toHaveTextContent(`${initial.counter.$count}`);
        expect(selectMultiplyCount).toHaveTextContent(
            `${initial.counter.$count * 10}`
        );
        expect(Count.runs).toEqual(1);
        expect(MultiplyCount.runs).toEqual(1);

        httpClient.match<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
        await sleep();

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
        expect(Count.runs).toEqual(2);
        expect(MultiplyCount.runs).toEqual(2);

        rerender(sut);

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
        expect(Count.runs).toEqual(2);
        expect(MultiplyCount.runs).toEqual(2);
    });

    it('cancels initial effect once destroyed before response', async () => {
        const { unmount } = render(sut);

        unmount();

        httpClient.match<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
        await sleep();

        const { queryByTestId } = render(sut);

        const selectCount = queryByTestId(counterTestIds.selectCount);
        assert(selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyCount
        );
        assert(selectMultiplyCount);

        expect(selectCount).toHaveTextContent(`${initial.counter.$count}`);
        expect(selectMultiplyCount).toHaveTextContent(
            `${initial.counter.$count * 10}`
        );
        expect(Count.runs).toEqual(2);
        expect(MultiplyCount.runs).toEqual(2);

        httpClient.clean();
    });

    it('increments store and renders result', async () => {
        const { queryByTestId } = render(sut);

        const button = queryByTestId(counterTestIds.add_1_button);
        assert(button);
        const selectCount = queryByTestId(counterTestIds.selectCount);
        assert(selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyCount
        );
        assert(selectMultiplyCount);

        httpClient.match<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
        await sleep();

        fireEvent.click(button);
        count += 1;
        fireEvent.click(button);
        count += 1;
        fireEvent.click(button);
        count += 1;

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
        expect(Count.runs).toEqual(5);
        expect(MultiplyCount.runs).toEqual(5);
    });

    it('increments store, saves optimistic and renders result', async () => {
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

        httpClient.match<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
        await sleep();

        fireEvent.click(button);
        let pendingRequest = httpClient.match<number, { count: number }>(
            COUNTER_SAVE_COUNT_ENDPOINT
        );
        count = pendingRequest.params.count;
        pendingRequest.resolve(count);
        await sleep();

        fireEvent.click(button);
        pendingRequest = httpClient.match<number, { count: number }>(
            COUNTER_SAVE_COUNT_ENDPOINT
        );
        count = pendingRequest.params.count;
        pendingRequest.resolve(count);
        await sleep();

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
        expect(Count.runs).toEqual(4);
        expect(MultiplyCount.runs).toEqual(4);
    });

    it('increments store, saves pessimistic and renders result', async () => {
        const { queryByTestId } = render(sut);

        const button = queryByTestId(
            counterTestIds.add_1_andSavePessimisticButton
        );
        assert(button);
        const selectCount = queryByTestId(counterTestIds.selectCount);
        assert(selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyCount
        );
        assert(selectMultiplyCount);

        httpClient.match<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
        await sleep();

        fireEvent.click(button);
        let pendingRequest = httpClient.match<number, { increment: number }>(
            COUNTER_INCREMENT_ENDPOINT
        );
        count += pendingRequest.params.increment;
        pendingRequest.resolve(count);
        await sleep();

        fireEvent.click(button);
        pendingRequest = httpClient.match<number, { increment: number }>(
            COUNTER_INCREMENT_ENDPOINT
        );
        count += pendingRequest.params.increment;
        pendingRequest.resolve(count);
        await sleep();

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
        expect(Count.runs).toEqual(4);
        expect(MultiplyCount.runs).toEqual(4);
    });
});

describe(`Double ${Counter.name} app`, () => {
    const countersTestIds = {
        counter0: 'counter-0',
        counter1: 'counter-1'
    };
    let count: number;
    const initial: AppState = {
        counter: {
            $count: 0
        }
    };
    let rootStore: RootStore;
    let sut: JSX.Element;

    beforeEach(() => {
        count = 3;
        rootStore = RootStore.make(initial);
        sut = (
            <RootStoreContext.Provider value={rootStore}>
                <div data-testid={countersTestIds.counter0}>
                    <Counter />
                </div>
                <div data-testid={countersTestIds.counter1}>
                    <Counter />
                </div>
            </RootStoreContext.Provider>
        );
        Count.runs = 0;
        MultiplyCount.runs = 0;
    });

    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });

    it('renders without errors', async () => {
        expect(() => render(sut)).not.toThrow();
        httpClient.clean();
    });

    it('renders both component once one fires increment', async () => {
        const { queryByTestId } = render(sut);

        const counter0 = queryByTestId(countersTestIds.counter0);
        assert(counter0);

        const button0 = within(counter0).queryByTestId(
            counterTestIds.add_1_button
        );
        assert(button0);
        const selectCount0 = within(counter0).queryByTestId(
            counterTestIds.selectCount
        );
        assert(selectCount0);

        const counter1 = queryByTestId(countersTestIds.counter1);
        assert(counter1);
        const selectCount1 = within(counter1).queryByTestId(
            counterTestIds.selectCount
        );
        assert(selectCount1);

        httpClient.match<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
        await sleep();

        httpClient.match<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
        await sleep();

        fireEvent.click(button0);
        count += 1;

        expect(selectCount0).toHaveTextContent(`${count}`);
        expect(selectCount1).toHaveTextContent(`${count}`);
        expect(Count.runs).toEqual(6);
    });
});
