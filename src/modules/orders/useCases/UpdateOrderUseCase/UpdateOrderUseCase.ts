import type { UseCase } from 'src/@types';
import type {
    OrderEntity,
    OrderEntityCollection,
    OrderEntityDto,
    OrdersGateway,
    OrdersPresentationEntity,
} from '../../types';

type OrderEntityCollectionDep = Pick<OrderEntityCollection, 'patch'>;
type OrdersPresentationEntityDep = Pick<OrdersPresentationEntity, 'patchData'>;
type OrdersGatewayDep = Pick<OrdersGateway, 'updateOrder'>;

export class UpdateOrderUseCase implements UseCase<[OrderEntity]> {
    constructor(
        private orderEntityCollection: OrderEntityCollectionDep,
        private ordersPresentation: OrdersPresentationEntityDep,
        private ordersGateway: OrdersGatewayDep,
    ) {}

    async execute(order: OrderEntity): Promise<void> {
        this.ordersPresentation.patchData({ isLoading: true });
        try {
            const updatedOrder = await this.ordersGateway.updateOrder(order);

            this.successTransaction(updatedOrder);
        } catch (error) {
            this.failureTransaction();
        }
    }

    successTransaction(order: OrderEntityDto): void {
        this.orderEntityCollection.patch(order.id, order);
        this.ordersPresentation.patchData({ isLoading: false });
    }

    failureTransaction(): void {
        this.ordersPresentation.patchData({ isLoading: false });
    }
}
