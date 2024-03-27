import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';
import { useLocalAdapter, useObservableState } from 'src/hooks';
import { OrdersStoreContext } from 'src/modules/orders/contexts';
import { orderItemTestId } from '../../../testIds';

interface OrderItemProps {
    orderId: string;
    itemId: string;
    rendersCounter?: () => void;
}

export const OrderItem: FC<OrderItemProps> = observer(function OrderItem(props) {
    const ordersStore = useContext(OrdersStoreContext);
    const orderIdStore = useObservableState(props.orderId, [props.orderId]);
    const itemIdStore = useObservableState(props.itemId, [props.itemId]);
    const presenter = useLocalAdapter(() => {
        const item = computed(() => {
            const order = ordersStore.orderModelCollection.get(orderIdStore.value);
            const item = order?.items.get(itemIdStore.value);
            return item;
        });
        return {
            get itemId(): string {
                return item.get()?.id ?? '';
            },
            get productId(): string {
                return item.get()?.productId ?? '';
            },
            get productQuantity(): number {
                return item.get()?.quantity ?? 0;
            },
        };
    });
    const controller = useLocalAdapter(() => {
        return {
            deleteButtonClicked(): void {
                const order = ordersStore.orderModelCollection.get(orderIdStore.value);
                order?.items.remove(props.itemId);
            },
        };
    });
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
