import { render, waitFor, screen, act } from '@testing-library/react';
import { computed, makeObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { useAdapter } from 'src/hooks';
import { useRenderCounter } from 'src/utils/testing';
import { OrderModelCollection } from '../../models';
import { orderModelDtoFactory } from '../../models/OrderModel/OrderModel.factory';
import type { OrderEntityCollection, OrderEntityDto } from '../../types';
import { TotalOrderItemQuantitySelectorNotOptimized } from './TotalOrderItemQuantitySelectorNotOptimized';

describe(`${TotalOrderItemQuantitySelectorNotOptimized.name}`, () => {
    let orderEntityCollectionDto: OrderEntityDto[];
    let orderEntityCollection: OrderEntityCollection;
    let sut: TotalOrderItemQuantitySelectorNotOptimized;
    let orderEntityCollectionDtoItemsAmount: number;
    let renderCounter: () => number;
    let propToForceRerender: number;
    const resultTestId = 'result';

    beforeEach(() => {
        propToForceRerender = 0;
        orderModelDtoFactory.resetCount();
        orderEntityCollectionDto = orderModelDtoFactory.list({ count: 3 });
        orderEntityCollection = OrderModelCollection.make();
        orderEntityCollectionDtoItemsAmount = orderEntityCollectionDto.reduce(
            (totalAmountOfItems, order) => {
                return (
                    totalAmountOfItems +
                    order.items.reduce(
                        (amountOfItemsInOrder, item) => amountOfItemsInOrder + item.quantity,
                        0,
                    )
                );
            },
            0,
        );
        sut = new TotalOrderItemQuantitySelectorNotOptimized(orderEntityCollection);
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

    it('recalculates total amount of items each select() call', async () => {
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
    });

    it('returns memoized total amount of items if select() is behind a presenter', async () => {
        class Presenter {
            constructor(private sut: TotalOrderItemQuantitySelectorNotOptimized) {
                makeObservable(this);
            }

            @computed
            get totalQuantity(): number {
                return this.sut.select();
            }
        }

        const OrdersAmount: FC<{ propToForceRerender: number }> = observer(
            ({ propToForceRerender: param }) => {
                const presenter = useAdapter(() => new Presenter(sut));
                renderCounter = useRenderCounter();
                return (
                    <div>
                        <div>{param}</div>
                        <div data-testid={resultTestId}>{presenter.totalQuantity}</div>
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
        expect(sut.calculations.select).toBe(2);
    });
});
