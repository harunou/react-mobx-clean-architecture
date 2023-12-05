import type { ServiceGateway } from '../../types';

export class RemoteServiceGatewayStub implements ServiceGateway {
    static make(): ServiceGateway {
        return new RemoteServiceGatewayStub();
    }

    async logOrders(): Promise<void> {
        return Promise.resolve();
    }
}
