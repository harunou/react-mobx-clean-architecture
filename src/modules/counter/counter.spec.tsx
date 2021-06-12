import { noop } from '@core/core.helpers';
import { httpClient } from '@core/http-client';
import { COUNTER_INITIAL_STATE } from '@stores/domain/counter/counter.tokens';
import { CounterState } from '@stores/domain/counter/counter.types';
import { rootRegistry } from '@stores/root/root.registry';
import { render } from '@testing-library/react';
import { container, DependencyContainer } from 'tsyringe';
import { CountSelector } from './adapter/selectors/count/count.selector';
import { MultiplyCountSelector } from './adapter/selectors/multiply-count/multiply-count.selector';
import { Counter, RootContainerContext } from './counter';

/* eslint-disable jest/no-commented-out-tests */
// eslint-disable-next-line jest/no-disabled-tests
describe(`${Counter.name}`, () => {
    let count: number;
    // const initial: CounterState = {
    //     count$: 0
    // };
    let sut: JSX.Element;
    let rootContainer: DependencyContainer;
    beforeEach(() => {
        rootContainer = container.createChildContainer();
        rootRegistry.applyTo(rootContainer);
        // rootContainer.register(COUNTER_INITIAL_STATE, { useValue: initial });
        count = 3;
        sut = (
            <RootContainerContext.Provider value={rootContainer}>
                <Counter />
            </RootContainerContext.Provider>
        );
        CountSelector.runs = 0;
        MultiplyCountSelector.runs = 0;
        noop(count);
    });
    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });
    it('renders without errors', async () => {
        expect(() => render(sut)).not.toThrow();
        // httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
    });
    // it('inits store and renders initial result', async () => {
    //     const { queryByTestId, rerender } = render(sut);
    //     const selectCount = queryByTestId(counterTestIds.selectCount);
    //     assert(selectCount);
    //     const selectMultiplyCount = queryByTestId(
    //         counterTestIds.selectMultiplyCountOn_10
    //     );
    //     assert(selectMultiplyCount);
    //     expect(selectCount).toHaveTextContent(`${initial.counter.count$}`);
    //     expect(selectMultiplyCount).toHaveTextContent(
    //         `${initial.counter.count$ * 10}`
    //     );
    //     expect(CountSelector.runs).toEqual(1);
    //     expect(MultiplyCountSelector.runs).toEqual(1);
    //     httpClient.expectOne<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
    //     await sleep();
    //     expect(selectCount).toHaveTextContent(`${count}`);
    //     expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
    //     expect(CountSelector.runs).toEqual(2);
    //     expect(MultiplyCountSelector.runs).toEqual(2);
    //     rerender(sut);
    //     expect(selectCount).toHaveTextContent(`${count}`);
    //     expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
    //     expect(CountSelector.runs).toEqual(2);
    //     expect(MultiplyCountSelector.runs).toEqual(2);
    // });
    // it('cancels initial effect once destroyed before response', async () => {
    //     const { unmount } = render(sut);
    //     unmount();
    //     httpClient.expectOne<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
    //     await sleep();
    //     httpClient.verify();
    //     const { queryByTestId } = render(sut);
    //     const selectCount = queryByTestId(counterTestIds.selectCount);
    //     assert(selectCount);
    //     expect(selectCount).toHaveTextContent(`${initial.counter.count$}`);
    //     expect(CountSelector.runs).toEqual(2);
    //     httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
    // });
    // it('increments store and renders result', async () => {
    //     const { queryByTestId } = render(sut);
    //     const button = queryByTestId(counterTestIds.add_1_button);
    //     assert(button);
    //     const selectCount = queryByTestId(counterTestIds.selectCount);
    //     assert(selectCount);
    //     const selectMultiplyCount = queryByTestId(
    //         counterTestIds.selectMultiplyCountOn_10
    //     );
    //     assert(selectMultiplyCount);
    //     httpClient.expectOne<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
    //     await sleep();
    //     fireEvent.click(button);
    //     count += 1;
    //     fireEvent.click(button);
    //     count += 1;
    //     fireEvent.click(button);
    //     count += 1;
    //     expect(selectCount).toHaveTextContent(`${count}`);
    //     expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
    //     expect(CountSelector.runs).toEqual(5);
    //     expect(MultiplyCountSelector.runs).toEqual(5);
    // });
    // it('increments store, saves optimistic and renders result', async () => {
    //     const { queryByTestId } = render(sut);
    //     const button = queryByTestId(
    //         counterTestIds.add_1_andSaveOptimisticButton
    //     );
    //     assert(button);
    //     const selectCount = queryByTestId(counterTestIds.selectCount);
    //     assert(selectCount);
    //     const selectMultiplyCount = queryByTestId(
    //         counterTestIds.selectMultiplyCountOn_10
    //     );
    //     assert(selectMultiplyCount);
    //     httpClient.expectOne<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
    //     await sleep();
    //     fireEvent.click(button);
    //     let pendingRequest = httpClient.expectOne<number, { count: number }>(
    //         COUNTER_SAVE_COUNT_ENDPOINT
    //     );
    //     count = pendingRequest.params.count;
    //     pendingRequest.resolve(count);
    //     await sleep();
    //     fireEvent.click(button);
    //     pendingRequest = httpClient.expectOne<number, { count: number }>(
    //         COUNTER_SAVE_COUNT_ENDPOINT
    //     );
    //     count = pendingRequest.params.count;
    //     pendingRequest.resolve(count);
    //     await sleep();
    //     expect(selectCount).toHaveTextContent(`${count}`);
    //     expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
    //     expect(CountSelector.runs).toEqual(4);
    //     expect(MultiplyCountSelector.runs).toEqual(4);
    // });
    // it('increments store, saves pessimistic and renders result', async () => {
    //     const { queryByTestId } = render(sut);
    //     const button = queryByTestId(
    //         counterTestIds.add_1_andSavePessimisticButton
    //     );
    //     assert(button);
    //     const selectCount = queryByTestId(counterTestIds.selectCount);
    //     assert(selectCount);
    //     const selectMultiplyCount = queryByTestId(
    //         counterTestIds.selectMultiplyCountOn_10
    //     );
    //     assert(selectMultiplyCount);
    //     httpClient.expectOne<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
    //     await sleep();
    //     fireEvent.click(button);
    //     let pendingRequest = httpClient.expectOne<
    //         number,
    //         { increment: number }
    //     >(COUNTER_INCREMENT_ENDPOINT);
    //     count += pendingRequest.params.increment;
    //     pendingRequest.resolve(count);
    //     await sleep();
    //     fireEvent.click(button);
    //     pendingRequest = httpClient.expectOne<number, { increment: number }>(
    //         COUNTER_INCREMENT_ENDPOINT
    //     );
    //     count += pendingRequest.params.increment;
    //     pendingRequest.resolve(count);
    //     await sleep();
    //     expect(selectCount).toHaveTextContent(`${count}`);
    //     expect(selectMultiplyCount).toHaveTextContent(`${count * 10}`);
    //     expect(CountSelector.runs).toEqual(4);
    //     expect(MultiplyCountSelector.runs).toEqual(4);
    // });
    // it('cancels pessimistic effect once counter destroyed before response', async () => {
    //     const { queryByTestId, unmount, rerender } = render(sut);
    //     const button = queryByTestId(
    //         counterTestIds.add_1_andSavePessimisticButton
    //     );
    //     assert(button);
    //     httpClient.expectOne<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
    //     await sleep();
    //     fireEvent.click(button);
    //     unmount();
    //     const pendingRequest = httpClient.expectOne<
    //         number,
    //         { increment: number }
    //     >(COUNTER_INCREMENT_ENDPOINT);
    //     pendingRequest.resolve(count + pendingRequest.params.increment);
    //     await sleep();
    //     httpClient.verify();
    //     rerender(sut);
    //     const selectCount = queryByTestId(counterTestIds.selectCount);
    //     assert(selectCount);
    //     expect(selectCount).toHaveTextContent(`${count}`);
    //     expect(CountSelector.runs).toEqual(3);
    //     httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
    // });
});

// eslint-disable-next-line jest/no-disabled-tests
describe.skip(`Double ${Counter.name} app`, () => {
    const countersTestIds = {
        counter0: 'counter-0',
        counter1: 'counter-1'
    };
    let count: number;
    const initial: CounterState = {
        count$: 0
    };
    let sut: JSX.Element;
    beforeEach(() => {
        count = 3;
        sut = (
            <>
                <div data-testid={countersTestIds.counter0}>
                    <Counter />
                </div>
                <div data-testid={countersTestIds.counter1}>
                    <Counter />
                </div>
            </>
        );
        container.register(COUNTER_INITIAL_STATE, { useValue: initial });
        CountSelector.runs = 0;
        MultiplyCountSelector.runs = 0;
        noop(initial);
        noop(count);
    });
    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });
    it('renders without errors', async () => {
        expect(() => render(sut)).not.toThrow();
        // httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
        // httpClient.expectOne(COUNTER_GET_COUNT_ENDPOINT);
    });
    // it('renders both component once one fires increment', async () => {
    //     const { queryByTestId } = render(sut);
    //     const counter0 = queryByTestId(countersTestIds.counter0);
    //     assert(counter0);
    //     const button0 = within(counter0).queryByTestId(
    //         counterTestIds.add_1_button
    //     );
    //     assert(button0);
    //     const selectCount0 = within(counter0).queryByTestId(
    //         counterTestIds.selectCount
    //     );
    //     assert(selectCount0);
    //     const counter1 = queryByTestId(countersTestIds.counter1);
    //     assert(counter1);
    //     const selectCount1 = within(counter1).queryByTestId(
    //         counterTestIds.selectCount
    //     );
    //     assert(selectCount1);
    //     httpClient.expectOne<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
    //     await sleep();
    //     httpClient.expectOne<number>(COUNTER_GET_COUNT_ENDPOINT).resolve(count);
    //     await sleep();
    //     fireEvent.click(button0);
    //     count += 1;
    //     expect(selectCount0).toHaveTextContent(`${count}`);
    //     expect(selectCount1).toHaveTextContent(`${count}`);
    //     expect(CountSelector.runs).toEqual(6);
    // });
});
