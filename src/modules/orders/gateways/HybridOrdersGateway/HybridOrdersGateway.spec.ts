import { HybridOrdersGateway } from './HybridOrdersGateway';
import type { OrdersGateway } from '../../types';

describe(`${HybridOrdersGateway.name}`, () => {
    let hybridOrdersGateway: HybridOrdersGateway;
    let remoteOrdersGateway: OrdersGateway;
    let localOrdersGateway: OrdersGateway;

    beforeEach(() => {
        remoteOrdersGateway = {
            fetchOrders: jest.fn(),
            updateOrder: jest.fn(),
            deleteOrder: jest.fn(),
            deleteItem: jest.fn(),
        };
        localOrdersGateway = {
            fetchOrders: jest.fn(),
            updateOrder: jest.fn(),
            deleteOrder: jest.fn(),
            deleteItem: jest.fn(),
        };
        hybridOrdersGateway = new HybridOrdersGateway(remoteOrdersGateway, localOrdersGateway);
    });

    describe('useRemoteGateway', () => {
        it('sets the gateway to remoteGateway', () => {
            hybridOrdersGateway.useRemoteGateway();

            expect(hybridOrdersGateway.gateway).toBe(remoteOrdersGateway);
        });
    });

    describe('useLocalGateway', () => {
        it('sets the gateway to localGateway', () => {
            hybridOrdersGateway.useLocalGateway();

            expect(hybridOrdersGateway.gateway).toBe(localOrdersGateway);
        });
    });
});
