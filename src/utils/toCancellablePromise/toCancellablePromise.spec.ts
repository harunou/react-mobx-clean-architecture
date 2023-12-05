import { toCancellablePromise } from './toCancellablePromise';

describe(`${toCancellablePromise.name}`, () => {
    let successPromiseFunction: (n: number) => Promise<number>;
    let failurePromiseFunction: (e: Error) => Promise<never>;
    let abortController: AbortController;

    beforeEach(() => {
        successPromiseFunction = jest.fn((n: number): Promise<number> => Promise.resolve(n));
        failurePromiseFunction = jest.fn((e: Error): Promise<never> => Promise.reject(e));
        abortController = new AbortController();
    });

    it('accepts object without signal', async () => {
        const value = 3;
        const cancellablePromise = toCancellablePromise(successPromiseFunction);
        await expect(cancellablePromise(value, {})).resolves.toEqual(value);
    });

    it('accepts function that returns success promise', async () => {
        const value = 3;
        const cancellablePromise = toCancellablePromise(successPromiseFunction);
        await expect(
            cancellablePromise(value, { signal: abortController.signal }),
        ).resolves.toEqual(value);
    });

    it('accepts function that rejects promise', async () => {
        const error = new Error('promise-error');
        const cancellablePromise = toCancellablePromise(failurePromiseFunction);
        await expect(cancellablePromise(error, { signal: abortController.signal })).rejects.toEqual(
            error,
        );
    });

    it('rejects once abort controller is aborted', async () => {
        const value = 3;
        const expected = new DOMException('Aborted', 'AbortError');
        const cancellablePromise = toCancellablePromise(successPromiseFunction);
        const promise = cancellablePromise(value, { signal: abortController.signal });
        abortController.abort();
        await expect(promise).rejects.toEqual(expected);
    });

    it('rejects once initialized with aborted abort controller', async () => {
        const value = 3;
        const expected = new DOMException('Aborted', 'AbortError');
        abortController.abort();
        const cancellablePromise = toCancellablePromise(successPromiseFunction);
        const promise = cancellablePromise(value, { signal: abortController.signal });
        await expect(promise).rejects.toEqual(expected);
    });
});
