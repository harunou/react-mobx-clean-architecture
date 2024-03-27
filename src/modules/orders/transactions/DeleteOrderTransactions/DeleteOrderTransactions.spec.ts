import { DeleteOrderTransaction, OrderEntityCollectionDep } from './DeleteOrderTransactions';

describe('DeleteOrderTransaction', () => {
    let orderModelCollection: OrderEntityCollectionDep;
    let deleteOrderTransaction: DeleteOrderTransaction;

    beforeEach(() => {
        orderModelCollection = {
            remove: jest.fn(),
        };
        deleteOrderTransaction = new DeleteOrderTransaction(orderModelCollection);
    });

    it('removes an order from the collection', () => {
        const id = '5';

        deleteOrderTransaction.commit(id);

        expect(orderModelCollection.remove).toHaveBeenCalledWith(id);
    });
});
