import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { useAdapter } from 'src/hooks';
import { orderItemTestId } from '../../../testIds';
import type { OrderItemController, OrderItemPresenter, OrderItemProps } from './OrderItem.types';

// NOTE(harunou): This presenter mock can be used for testing as well as
// providing mocked data for rendered previews.
export const Presenter = {
    make: (): OrderItemPresenter => ({}) as OrderItemPresenter,
};

export const Controller = {
    make: (): OrderItemController => ({}) as OrderItemController,
};

export const OrderItem: FC<OrderItemProps> = observer(function OrderItem(props) {
    void props;
    const presenter = useAdapter<OrderItemPresenter>(() => Presenter.make());
    const controller = useAdapter<OrderItemController>(() => Controller.make());
    return (
        <div data-testid={orderItemTestId}>
            <div>id: {presenter.itemId}</div>
            <div>productId: {presenter.productId}</div>
            <div>quantity: {presenter.productQuantity}</div>
            <button onClick={controller.deleteButtonClicked}>Delete Item</button>
        </div>
    );
});
