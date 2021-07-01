import { flow } from 'mobx';
import { computedFn } from 'mobx-utils';
import { CancellablePromise } from 'mobx/dist/internal';
import { CounterStore } from './domain/counter/counter.store';
import { CounterSourceStore } from './persistence/counter-source/counter-source.store';
import { RootStore } from './root/root.store';

export const selector = computedFn;
export const effect = flow;
export function makeCancellablePromiseStub(): CancellablePromise<never> {
    const f = flow(function* generator() {
        /* noop */
    });
    return f() as CancellablePromise<never>;
}

export const sliceCounterStore = (rootStore: RootStore): CounterStore => {
    return rootStore.domain.counter;
};

export const sliceCounterSourceStore = (
    rootStore: RootStore
): CounterSourceStore => {
    return rootStore.persistence.counterSource;
};
