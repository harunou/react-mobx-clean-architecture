import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';
import { OrdersStoreContext } from 'src/modules/orders/contexts';
import { orderItemTestId } from '../../../testIds';

interface OrderItemProps {
    orderId: string;
    itemId: string;
    rendersCounter?: () => void;
}

export const OrderItem: FC<OrderItemProps> = observer(function OrderItem(props) {
    const { orderModelCollection: orders } = useContext(OrdersStoreContext);
    props.rendersCounter?.();
    return (
        <div data-testid={orderItemTestId}>
            <div>id: {orders.get(props.orderId)?.items.get(props.itemId)?.id}</div>
            <div>productId: {orders.get(props.orderId)?.items.get(props.itemId)?.productId}</div>
            <div>quantity: {orders.get(props.orderId)?.items.get(props.itemId)?.quantity}</div>
            <button onClick={(): void => orders.get(props.orderId)?.items.remove(props.itemId)}>
                Delete Item
            </button>
        </div>
    );
});
