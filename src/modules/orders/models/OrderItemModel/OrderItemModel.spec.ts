import type { OrderItemEntityDto } from '../../types';
import { OrderItemModel } from './OrderItemModel';
import { orderItemEntityDtoFactory } from './OrderItemModel.factory';

describe(`${OrderItemModel.name}`, () => {
    let orderItemEntityDto: OrderItemEntityDto;
    let orderItemModel: OrderItemModel;

    beforeEach(() => {
        orderItemEntityDto = orderItemEntityDtoFactory.item();
        orderItemModel = new OrderItemModel(orderItemEntityDto);
    });

    it('sets the initial data correctly', () => {
        expect(orderItemModel.id).toBe(orderItemEntityDto.id);
        expect(orderItemModel.productId).toBe(orderItemEntityDto.productId);
        expect(orderItemModel.quantity).toBe(orderItemEntityDto.quantity);
    });

    it('updates the data correctly using setData method', () => {
        const updatedItemEntityDto = orderItemEntityDtoFactory.item();

        orderItemModel.setData(updatedItemEntityDto);

        expect(orderItemModel.id).toBe(updatedItemEntityDto.id);
        expect(orderItemModel.productId).toBe(updatedItemEntityDto.productId);
        expect(orderItemModel.quantity).toBe(updatedItemEntityDto.quantity);
    });

    it('updates the data correctly using patchData method', () => {
        const updatedQuantity = 9999;
        orderItemModel.patchData({ quantity: updatedQuantity });

        expect(orderItemModel.id).toBe(orderItemEntityDto.id);
        expect(orderItemModel.productId).toBe(orderItemEntityDto.productId);
        expect(orderItemModel.quantity).toBe(updatedQuantity);
    });

    it('returns the correct dto', () => {
        const dto = orderItemModel.dto;

        expect(dto.id).toBe(orderItemModel.id);
        expect(dto.productId).toBe(orderItemModel.productId);
        expect(dto.quantity).toBe(orderItemModel.quantity);
    });
});
