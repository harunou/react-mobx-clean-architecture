import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { InjectionToken } from 'tsyringe';

export const makeInjectionToken = <T = unknown>(
    key: string
): InjectionToken<T> => {
    return Symbol(key);
};

export const makeCancellablePromiseStub = (): CancellablePromise<never> => {
    const f = flow(function* generator() {
        /* noop */
    });
    return f() as CancellablePromise<never>;
};
