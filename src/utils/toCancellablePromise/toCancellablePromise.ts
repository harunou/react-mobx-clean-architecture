const abortControllerError = new DOMException('Aborted', 'AbortError');

export function toCancellablePromise<TArgs extends unknown[], TReturn>(
    promiseFunction: (...args: TArgs) => Promise<TReturn>,
): (...args: readonly [...TArgs, { signal?: AbortSignal }]) => Promise<TReturn> {
    return (...args) => {
        const { signal: defaultSignal } = new AbortController();
        const { signal = defaultSignal } = args.slice().pop() as { signal?: AbortSignal };
        const promiseFunctionArguments = args.slice(0, -1) as TArgs;
        return new Promise((resolve, reject) => {
            if (signal.aborted) {
                reject(abortControllerError);
            }
            signal.addEventListener(
                'abort',
                () => {
                    reject(abortControllerError);
                },
                { once: true },
            );

            promiseFunction(...promiseFunctionArguments)
                .then((result) => {
                    if (signal.aborted) {
                        return;
                    }
                    resolve(result);
                })
                .catch((result) => {
                    if (signal.aborted) {
                        return;
                    }
                    reject(result);
                });
        });
    };
}
