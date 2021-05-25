import { PendingRequest, TestHttpClient } from './test-http-client.types';

export const makeTestHttpClient = (): TestHttpClient => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pendingRequests: PendingRequest<any, any>[] = [];

    const request = <R, P = unknown>(
        endpoint: string,
        params?: P
    ): Promise<R> => {
        return new Promise((resolve, reject) => {
            pendingRequests.push({
                endpoint,
                params,
                resolve,
                reject
            });
        });
    };

    const expectOne = <R = unknown, P = unknown>(
        endpoint: string
    ): PendingRequest<R, P> => {
        const index = pendingRequests.findIndex((r) => r.endpoint === endpoint);
        if (index === -1) {
            throw new Error(`No pending request found for the ${endpoint}`);
        }
        const pendingRequest = pendingRequests[index];
        pendingRequests.splice(index, 1);
        return pendingRequest;
    };

    const verify = (): void => {
        if (pendingRequests.length) {
            throw new Error(`Http client still has pending requests`);
        }
    };

    const clean = (): void => {
        pendingRequests = [];
    };

    return {
        request,
        expectOne,
        verify,
        clean
    };
};
