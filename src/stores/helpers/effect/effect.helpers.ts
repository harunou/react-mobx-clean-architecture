import { CancellablePromise } from 'mobx/dist/internal';
import { EffectConstructor, EffectInteractionBuilder } from './effect.types';

export class EffectBuilder<S, P, E>
    implements EffectInteractionBuilder<S, P, E> {
    static make<CS, CP, CE>(
        effectConstructor: EffectConstructor<CS, CP, CE>
    ): EffectBuilder<CS, CP, CE> {
        return new EffectBuilder(effectConstructor);
    }
    private effect: E | null = null;

    constructor(private effectConstructor: EffectConstructor<S, P, E>) {}

    build(store: S, persistence: P, isSingleton = true): E {
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
