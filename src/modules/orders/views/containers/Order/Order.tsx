import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';
import { useAdapter, useObservableState } from 'src/hooks';
import { OrdersStoreContext } from 'src/modules/orders/contexts';
import { orderTestId } from '../../testIds';
import { OrderItem } from '../OrderItem';
import { OrderController, OrderPresenter } from './OrderAdapter';

interface OrderParams {
    orderId: string;
}

export const Order: FC<OrderParams> = observer(function Order(params) {
    const ordersStore = useContext(OrdersStoreContext);
    const orderIdStore = useObservableState(params.orderId, [params.orderId]);
    const presenter = useAdapter(() => OrderPresenter.make(ordersStore, orderIdStore));
    const controller = useAdapter(() => OrderController.make(ordersStore, orderIdStore));
    return (
        <div data-testid={orderTestId}>
            <div>OrderId: {presenter.orderId}</div>
            <div>User: {presenter.userId}</div>
            <div style={{ paddingBottom: '10px' }}>
                <div>Items:</div>
                {presenter.itemIds.map((itemId) => (
                    <OrderItem key={itemId} orderId={params.orderId} itemId={itemId} />
                ))}
                <button onClick={controller.deleteOrderButtonClicked}>Delete Order</button>
            </div>
        </div>
    );
});
