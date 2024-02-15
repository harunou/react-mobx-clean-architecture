import { DeleteOrderTransaction, OrderEntityCollectionDep } from './DeleteOrderTransactions';

describe('DeleteOrderTransaction', () => {
    let orderEntityCollection: OrderEntityCollectionDep;
    let deleteOrderTransaction: DeleteOrderTransaction;

    beforeEach(() => {
        orderEntityCollection = {
            remove: jest.fn(),
        };
        deleteOrderTransaction = new DeleteOrderTransaction(orderEntityCollection);
    });

    it('removes an order from the collection', () => {
        const id = '5';

        deleteOrderTransaction.commit(id);

        expect(orderEntityCollection.remove).toHaveBeenCalledWith(id);
    });
});
