import { CancellablePromise } from 'mobx/dist/internal';

export const FLOW_CANCELLED = 'FLOW_CANCELLED';

export class EffectFlow<T = unknown> {
    #promise: CancellablePromise<T> | null = null;

    set promise(flow: CancellablePromise<T> | null) {
        this.#promise = flow;
    }

    get promise(): CancellablePromise<T> | null {
        return this.#promise;
    }

    cancel(): void {
        if (this.#promise) {
            this.#promise.cancel();
        }
    }
}
