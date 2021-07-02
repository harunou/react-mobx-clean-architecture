import {
    COUNTER_GET_COUNT_ENDPOINT,
    COUNTER_INCREMENT_ENDPOINT,
    COUNTER_SAVE_COUNT_ENDPOINT
} from '@api/counterRemoteSource/counterRemoteSource.service';
import { httpClient } from '@core/http-client';
import { act, fireEvent, render, within } from '@testing-library/react';
import assert from 'assert';
import { StrictMode } from 'react';
import { counterTestIds } from './counter';

describe.skip(`Counter`, () => {
    const initial = 0;
    let count: number;
    let sut: JSX.Element;
    beforeEach(() => {
        count = 3;
        // const rootContainer = makeRootContainer(rootRegistry);
        sut = (
            <StrictMode>
                {/* <RootContainerProvider container={rootContainer}>
                    <Counter />
                </RootContainerProvider> */}
            </StrictMode>
        );
    });
    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });
    it('renders without errors', async () => {
        expect(() => render(sut)).not.toThrow();
        httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
    });
    it('inits store and renders initial result', async () => {
        const { queryByTestId, rerender } = render(sut);
        const selectCount = queryByTestId(counterTestIds.selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyTenTimesCount
        );

        expect(selectCount).toHaveTextContent(`${initial}`);
        expect(selectMultiplyCount).toHaveTextContent(`${initial * 10}`);

        await act(async () =>
            httpClient
                .expectOne<number>(COUNTER_GET_COUNT_ENDPOINT)
                .resolve(count)
        );

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 0}`);

        rerender(sut);

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 0}`);
    });
    it('cancels initial effect once destroyed before response', async () => {
        const { unmount } = render(sut);
        unmount();

        await act(async () =>
            httpClient
                .expectOne<number>(COUNTER_GET_COUNT_ENDPOINT)
                .resolve(count)
        );
        httpClient.verify();

        const { queryByTestId } = render(sut);
        const selectCount = queryByTestId(counterTestIds.selectCount);

        expect(selectCount).toHaveTextContent(`${initial}`);

        httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
    });
    it('increments store and renders result', async () => {
        const { queryByTestId } = render(sut);
        const button = queryByTestId(counterTestIds.addOneButton);
        assert(button);
        const selectCount = queryByTestId(counterTestIds.selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyTenTimesCount
        );

        await act(async () =>
            httpClient
                .expectOne<number>(COUNTER_GET_COUNT_ENDPOINT)
                .resolve(count)
        );

        fireEvent.click(button);
        count += 1;
        fireEvent.click(button);
        count += 1;
        fireEvent.click(button);
        count += 1;

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
    });
    it('increments store, saves optimistic and renders result', async () => {
        const { queryByTestId } = render(sut);

        const button = queryByTestId(
            counterTestIds.addOneAndSaveOptimisticButton
        );
        assert(button);
        const selectCount = queryByTestId(counterTestIds.selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyTenTimesCount
        );

        await act(async () =>
            httpClient
                .expectOne<number>(COUNTER_GET_COUNT_ENDPOINT)
                .resolve(count)
        );

        fireEvent.click(button);

        let pendingRequest = httpClient.expectOne<number, { count: number }>(
            COUNTER_SAVE_COUNT_ENDPOINT
        );
        count = pendingRequest.params.count;
        await act(async () => pendingRequest.resolve(count));

        fireEvent.click(button);

        pendingRequest = httpClient.expectOne<number, { count: number }>(
            COUNTER_SAVE_COUNT_ENDPOINT
        );
        count = pendingRequest.params.count;
        await act(async () => pendingRequest.resolve(count));

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
    });
    it('increments store, saves pessimistic and renders result', async () => {
        const { queryByTestId } = render(sut);

        const button = queryByTestId(
            counterTestIds.addOneAndSavePessimisticButton
        );
        assert(button);
        const selectCount = queryByTestId(counterTestIds.selectCount);
        const selectMultiplyCount = queryByTestId(
            counterTestIds.selectMultiplyTenTimesCount
        );

        await act(async () =>
            httpClient
                .expectOne<number>(COUNTER_GET_COUNT_ENDPOINT)
                .resolve(count)
        );

        fireEvent.click(button);

        let pendingRequest = httpClient.expectOne<
            number,
            { increment: number }
        >(COUNTER_INCREMENT_ENDPOINT);
        count += pendingRequest.params.increment;
        await act(async () => pendingRequest.resolve(count));

        fireEvent.click(button);

        pendingRequest = httpClient.expectOne<number, { increment: number }>(
            COUNTER_INCREMENT_ENDPOINT
        );
        count += pendingRequest.params.increment;
        await act(async () => pendingRequest.resolve(count));

        expect(selectCount).toHaveTextContent(`${count}`);
        expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
    });
    it('cancels pessimistic effect once counter destroyed before response', async () => {
        const { queryByTestId, unmount, rerender } = render(sut);

        const button = queryByTestId(
            counterTestIds.addOneAndSavePessimisticButton
        );
        assert(button);

        await act(async () =>
            httpClient
                .expectOne<number>(COUNTER_GET_COUNT_ENDPOINT)
                .resolve(count)
        );

        fireEvent.click(button);

        unmount();

        const pendingRequest = httpClient.expectOne<
            number,
            { increment: number }
        >(COUNTER_INCREMENT_ENDPOINT);
        await act(async () =>
            pendingRequest.resolve(count + pendingRequest.params.increment)
        );

        httpClient.verify();

        rerender(sut);

        const selectCount = queryByTestId(counterTestIds.selectCount);

        expect(selectCount).toHaveTextContent(`${count}`);

        httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
    });
});

describe.skip(`Double Counter app`, () => {
    const countersTestIds = {
        counter0: 'counter-0',
        counter1: 'counter-1'
    };
    let count: number;
    let sut: JSX.Element;
    beforeEach(() => {
        count = 3;
        // const rootContainer = makeRootContainer(rootRegistry);
        sut = (
            <StrictMode>
                {/* <RootContainerProvider container={rootContainer}>
                    <div data-testid={countersTestIds.counter0}>
                        <Counter />
                    </div>
                    <div data-testid={countersTestIds.counter1}>
                        <Counter />
                    </div>
                </RootContainerProvider> */}
            </StrictMode>
        );
    });
    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });
    it('renders without errors', async () => {
        expect(() => render(sut)).not.toThrow();
        httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
        httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
    });
    it('renders both component once one fires increment', async () => {
        const { queryByTestId } = render(sut);
        const counter0 = queryByTestId(countersTestIds.counter0);
        assert(counter0);
        const button0 = within(counter0).queryByTestId(
            counterTestIds.addOneButton
        );
        assert(button0);
        const selectCount0 = within(counter0).queryByTestId(
            counterTestIds.selectCount
        );
        const counter1 = queryByTestId(countersTestIds.counter1);
        assert(counter1);
        const selectCount1 = within(counter1).queryByTestId(
            counterTestIds.selectCount
        );

        await act(async () =>
            httpClient
                .expectOne<number>(COUNTER_GET_COUNT_ENDPOINT)
                .resolve(count)
        );

        await act(async () =>
            httpClient
                .expectOne<number>(COUNTER_GET_COUNT_ENDPOINT)
                .resolve(count)
        );

        fireEvent.click(button0);
        count += 1;

        expect(selectCount0).toHaveTextContent(`${count}`);
        expect(selectCount1).toHaveTextContent(`${count}`);
    });
});
