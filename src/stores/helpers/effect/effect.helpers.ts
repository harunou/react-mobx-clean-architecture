import { CancellablePromise } from 'mobx/dist/internal';
import { EffectConstructor, EffectInteractionBuilder } from './effect.types';

export const FLOW_CANCELLED_MESSAGE = 'FLOW_CANCELLED';

export class EffectBuilder<S, R, E>
    implements EffectInteractionBuilder<S, R, E> {
    static make<CS, CR, CE>(
        effectConstructor: EffectConstructor<CS, CR, CE>
    ): EffectBuilder<CS, CR, CE> {
        return new EffectBuilder(effectConstructor);
    }
    private effect: E | null = null;

    constructor(private effectConstructor: EffectConstructor<S, R, E>) {}

    build(store: S, persistence: R, isSingleton = true): E {
        if (!isSingleton) {
            return this.effectConstructor.make({
                store,
                persistence
            });
        }
        if (!this.effect) {
            this.effect = this.effectConstructor.make({
                store,
                persistence
            });
        }
        return this.effect;
    }
}

export class EffectFlow<T = unknown> {
    static make<CT>(): EffectFlow<CT> {
        return new EffectFlow();
    }

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
