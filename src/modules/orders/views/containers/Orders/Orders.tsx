import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useAdapter, useLocalAdapter } from 'src/hooks';
import { OrdersStoreContext } from 'src/modules/orders/contexts';
import { TotalOrderItemQuantitySelector } from 'src/modules/orders/selectors';
import { OrdersStore } from 'src/modules/orders/stores';
import { DestroyModuleUseCase, LoadOrdersUseCase } from 'src/modules/orders/useCases';
import { ordersTestId, totalItemQuantityTestId } from '../../testIds';
import { Order } from '../Order/Order';
import { useAttachOrdersStoreToRootStore } from './Orders.utils';

export const Orders: FC = observer(function Orders() {
    const ordersStore = useAdapter(() => OrdersStore.make());
    const presenter = useLocalAdapter(() => {
        const totalOrderItemQuantitySelector = TotalOrderItemQuantitySelector.make(ordersStore);
        return {
            get orderIds(): string[] {
                return ordersStore.orderEntityCollection.entities.map((entity) => entity.id);
            },
            get isLoading(): boolean {
                return ordersStore.ordersPresentationEntity.isLoading;
            },
            get totalItemsQuantity(): number {
                return totalOrderItemQuantitySelector.select();
            },
        };
    });
    const controller = useLocalAdapter(() => {
        const loadOrdersUseCase = LoadOrdersUseCase.make(ordersStore);
        const destroyModuleUseCase = DestroyModuleUseCase.make(ordersStore);
        return {
            moduleStarted(): void {
                void loadOrdersUseCase.execute();
            },
            moduleDestroyed(): void {
                void destroyModuleUseCase.execute();
            },
        };
    });

    useAttachOrdersStoreToRootStore(ordersStore);

    useEffect(() => {
        controller.moduleStarted();
        return () => controller.moduleDestroyed();
    }, [controller]);

    return (
        <OrdersStoreContext.Provider value={ordersStore}>
            <div data-testid={ordersTestId}>
                <div>Orders</div>
                <div>
                    Total Items Quantity:{' '}
                    <span data-testid={totalItemQuantityTestId}>
                        {presenter.totalItemsQuantity}
                    </span>
                </div>
                <div>{presenter.isLoading && 'Loading...'}</div>
                {presenter.orderIds.map((orderId) => (
                    <Order key={orderId} orderId={orderId} />
                ))}
            </div>
        </OrdersStoreContext.Provider>
    );
});
