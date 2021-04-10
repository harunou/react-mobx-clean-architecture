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
