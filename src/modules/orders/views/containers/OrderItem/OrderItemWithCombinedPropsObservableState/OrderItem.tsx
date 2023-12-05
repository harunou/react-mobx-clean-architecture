import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';
import { useAdapter, useObservableState } from 'src/hooks';
import { OrdersStoreContext } from 'src/modules/orders/contexts';
import { orderItemTestId } from '../../../testIds';
import { OrderItemController, OrderItemPresenter } from './OrderItemAdapter';

interface OrderItemProps {
    orderId: string;
    itemId: string;
    rendersCounter?: () => void;
}

export const OrderItem: FC<OrderItemProps> = observer(function OrderItem(props) {
    const ordersStore = useContext(OrdersStoreContext);
    const orderPropsSore = useObservableState(props, [props]);
    const presenter = useAdapter(() => OrderItemPresenter.make(ordersStore, orderPropsSore));
    const controller = useAdapter(() => OrderItemController.make(ordersStore, orderPropsSore));
    props.rendersCounter?.();
    return (
        <div data-testid={orderItemTestId}>
            <div>id: {presenter.itemId}</div>
            <div>productId: {presenter.productId}</div>
            <div>quantity: {presenter.productQuantity}</div>
            <button onClick={controller.deleteButtonClicked}>Delete Item</button>
        </div>
    );
});
