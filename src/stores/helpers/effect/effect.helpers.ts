import { CancellablePromise } from 'mobx/dist/internal';
import {
    Effect,
    EffectConstructor,
    EffectInteractionBuilder
} from './effect.types';

export class EffectBuilder<S, P, R>
    implements EffectInteractionBuilder<S, P, R> {
    static make<CS, CP, CR>(
        useCaseConstructor: EffectConstructor<CS, CP, CR>
    ): EffectBuilder<CS, CP, CR> {
        return new EffectBuilder(useCaseConstructor);
    }

    private effect: Effect<R> | null = null;

    constructor(private EffectConstructor: EffectConstructor<S, P, R>) {}

    build(store: S, persistence: P, isSingleton = true): Effect<R> {
        if (!isSingleton) {
            return this.EffectConstructor.make({
                store,
                persistence
            });
        }
        if (!this.effect) {
            this.effect = this.EffectConstructor.make({
                store,
                persistence
            });
        }
        return this.effect;
    }
}

export class EffectFlow<T> {
    make(): EffectFlow<T> {
        return new EffectFlow();
    }

    #flow: CancellablePromise<T> | null = null;

    set flow(flow: CancellablePromise<T> | null) {
        this.#flow = flow;
    }

    get flow(): CancellablePromise<T> | null {
        return this.#flow;
    }

    cancel(): void {
        if (this.#flow) {
            this.#flow.cancel();
        }
    }
}
