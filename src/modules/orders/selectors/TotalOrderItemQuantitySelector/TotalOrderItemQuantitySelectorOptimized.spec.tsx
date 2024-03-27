import { render, waitFor, screen, act, fireEvent } from '@testing-library/react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import type { FC } from 'react';
import { useRenderCounter } from 'src/utils/testing';
import { OrderModelCollection } from '../../models';
import { orderModelDtoFactory } from '../../models/OrderModel/OrderModel.factory';
import type { OrderEntityCollection, OrderEntityDto } from '../../types';
import { TotalOrderItemQuantitySelectorOptimized } from './TotalOrderItemQuantitySelectorOptimized';

describe(`${TotalOrderItemQuantitySelectorOptimized.name}`, () => {
    let orderEntityCollectionDto: OrderEntityDto[];
    let orderEntityCollection: OrderEntityCollection;
    let sut: TotalOrderItemQuantitySelectorOptimized;
    let orderEntityCollectionDtoItemsAmount: number;
    let renderCounter: () => number;
    let propToForceRerender: number;
    const resultTestId = 'result';

    beforeEach(() => {
        jest.clearAllMocks();
        propToForceRerender = 0;
        orderModelDtoFactory.resetCount();
        orderEntityCollectionDto = orderModelDtoFactory.list({ count: 3 });
        orderEntityCollection = OrderModelCollection.make();
        orderEntityCollectionDtoItemsAmount = orderEntityCollectionDto.reduce(
            (totalInOrders, order) => {
                return (
                    totalInOrders +
                    order.items.reduce((totalInOrder, item) => totalInOrder + item.quantity, 0)
                );
            },
            0,
        );
        sut = new TotalOrderItemQuantitySelectorOptimized(orderEntityCollection);
    });

    it('returns correct amount of items', async () => {
        const OrdersAmount: FC = observer(() => {
            renderCounter = useRenderCounter();
            const totalItemsQuantity = sut.select();
            return (
                <div>
                    <div data-testid={resultTestId}>{totalItemsQuantity}</div>
                </div>
            );
        });

        // render 1
        render(<OrdersAmount />);
        // render 2
        act(() => orderEntityCollection.replaceAllFromDto(orderEntityCollectionDto));

        await waitFor(() =>
            expect(screen.getByTestId(resultTestId).textContent).toBe(
                `${orderEntityCollectionDtoItemsAmount}`,
            ),
        );
        expect(renderCounter()).toBe(2);
    });

    it('returns memoized total amount of items', async () => {
        const OrdersAmount: FC<{ propToForceRerender: number }> = observer(
            ({ propToForceRerender: param }) => {
                renderCounter = useRenderCounter();
                return (
                    <div>
                        <div>{param}</div>
                        <div data-testid={resultTestId}>{sut.select()}</div>
                    </div>
                );
            },
        );

        // render 1
        const { rerender } = render(
            <OrdersAmount propToForceRerender={(propToForceRerender += 1)} />,
        );
        // render 2
        act(() => orderEntityCollection.replaceAllFromDto(orderEntityCollectionDto));
        // render 3
        rerender(<OrdersAmount propToForceRerender={(propToForceRerender += 1)} />);
        // render 4
        rerender(<OrdersAmount propToForceRerender={(propToForceRerender += 1)} />);

        await waitFor(() =>
            expect(screen.getByTestId(resultTestId).textContent).toBe(
                `${orderEntityCollectionDtoItemsAmount}`,
            ),
        );
        expect(renderCounter()).toBe(4);
        expect(sut.calculations.select).toBe(4);
        expect(sut.calculations.totalQuantity).toBe(2);
    });

    it('returns memoized total amount of items even later in action', async () => {
        class Controller {
            constructor(
                private sut: TotalOrderItemQuantitySelectorOptimized,
                private logger: (number: number) => void,
            ) {}

            logTotalCount(): void {
                this.logger(this.sut.select());
            }
        }

        const logger = jest.fn();

        const OrdersAmount: FC<{ propToForceRerender: number }> = observer(
            ({ propToForceRerender: param }) => {
                const controller = useLocalObservable(() => new Controller(sut, logger));
                renderCounter = useRenderCounter();
                return (
                    <div>
                        <div>{param}</div>
                        <div data-testid={resultTestId}>{sut.select()}</div>
                        <button onClick={(): void => controller.logTotalCount()} />
                    </div>
                );
            },
        );

        // render 1
        const { rerender } = render(
            <OrdersAmount propToForceRerender={(propToForceRerender += 1)} />,
        );
        // render 2
        act(() => orderEntityCollection.replaceAllFromDto(orderEntityCollectionDto));
        // render 3
        rerender(<OrdersAmount propToForceRerender={(propToForceRerender += 1)} />);
        // render 4
        rerender(<OrdersAmount propToForceRerender={(propToForceRerender += 1)} />);

        fireEvent.click(screen.getByRole('button'));

        expect(renderCounter()).toBe(4);
        expect(sut.calculations.select).toBe(5);
        expect(sut.calculations.totalQuantity).toBe(2);
        expect(logger).toBeCalledWith(orderEntityCollectionDtoItemsAmount);
    });
});
