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
        private orderModelCollection: OrderEntityCollectionDep,
        private ordersPresentationModel: OrdersPresentationEntityDep,
        private ordersGateway: OrdersGatewayDep,
    ) {}

    async execute(order: OrderEntity): Promise<void> {
        this.ordersPresentationModel.patchData({ isLoading: true });
        try {
            const updatedOrder = await this.ordersGateway.updateOrder(order.dto);

            this.successTransaction(updatedOrder);
        } catch (error) {
            this.failureTransaction();
        }
    }

    successTransaction(order: OrderEntityDto): void {
        this.orderModelCollection.patch(order.id, order);
        this.ordersPresentationModel.patchData({ isLoading: false });
    }

    failureTransaction(): void {
        this.ordersPresentationModel.patchData({ isLoading: false });
    }
}
