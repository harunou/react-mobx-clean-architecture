import { PendingRequest, TestHttpClient } from './testing-tools.types';

export const makeAsyncRequest = <T>(
    timeoutMs: number,
    response: T
): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(response);
        }, timeoutMs);
    });
};

export const makeAsyncThrow = <T>(
    timeoutMs: number,
    response: T
): Promise<T> => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(response);
        }, timeoutMs);
    });
};

export const sleep = (ms = 0): Promise<unknown> =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve(undefined);
        }, ms)
    );

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

    const match = <R = unknown, P = unknown>(
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
        match,
        verify,
        clean
    };
};
