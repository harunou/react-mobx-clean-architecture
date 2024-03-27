import type { OrderItemEntityDto } from '../../types';
import { OrderItemModel } from './OrderItemModel';
import { orderItemModelDtoFactory } from './OrderItemModel.factory';

describe(`${OrderItemModel.name}`, () => {
    let orderItemModelDto: OrderItemEntityDto;
    let orderItemModel: OrderItemModel;

    beforeEach(() => {
        orderItemModelDto = orderItemModelDtoFactory.item();
        orderItemModel = new OrderItemModel(orderItemModelDto);
    });

    it('sets the initial data correctly', () => {
        expect(orderItemModel.id).toBe(orderItemModelDto.id);
        expect(orderItemModel.productId).toBe(orderItemModelDto.productId);
        expect(orderItemModel.quantity).toBe(orderItemModelDto.quantity);
    });

    it('updates the data correctly using setData method', () => {
        const updatedItemEntityDto = orderItemModelDtoFactory.item();

        orderItemModel.setData(updatedItemEntityDto);

        expect(orderItemModel.id).toBe(updatedItemEntityDto.id);
        expect(orderItemModel.productId).toBe(updatedItemEntityDto.productId);
        expect(orderItemModel.quantity).toBe(updatedItemEntityDto.quantity);
    });

    it('updates the data correctly using patchData method', () => {
        const updatedQuantity = 9999;
        orderItemModel.patchData({ quantity: updatedQuantity });

        expect(orderItemModel.id).toBe(orderItemModelDto.id);
        expect(orderItemModel.productId).toBe(orderItemModelDto.productId);
        expect(orderItemModel.quantity).toBe(updatedQuantity);
    });

    it('returns the correct dto', () => {
        const dto = orderItemModel.dto;

        expect(dto.id).toBe(orderItemModel.id);
        expect(dto.productId).toBe(orderItemModel.productId);
        expect(dto.quantity).toBe(orderItemModel.quantity);
    });
});
