export interface OrderItemProps {
    orderId: string;
    itemId: string;
}

// NOTE(harunou): OrderItemPresenter is defined along with the implementation of
// OrderItem.tsx. It should be implemented further to connect the component to
// the store.
export interface OrderItemPresenter {
    itemId: string;
    productId: string;
    productQuantity: number;
}

export interface OrderItemController {
    deleteButtonClicked(): void;
}
