import { flow, flowResult, makeObservable } from 'mobx';
import { CancellableEffect } from '@stores/helpers/effect/effect.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import { CounterSource } from '@stores/counter-source/counter-source.types';
import { COUNTER_SOURCE_STORE } from '@stores/root/root.store';

@injectable()
export class IncrementCountEffect implements CancellableEffect {
    constructor(
        @inject(COUNTER_SOURCE_STORE) private counterSource: CounterSource,
        private effectFlow: EffectFlow<number>
    ) {
        makeObservable(this, {
            saveGenerator: flow
        });
    }

    cancel(): void {
        this.effectFlow.cancel();
    }

    execute(increment: number): Promise<number> {
        this.effectFlow.promise = flowResult(this.saveGenerator(increment));
        return this.effectFlow.promise;
    }

    *saveGenerator(value: number): Generator<Promise<number>, number, number> {
        return yield this.counterSource.increment(value);
    }
}

export const INCREMENT_COUNT_EFFECT: InjectionToken<CancellableEffect> = Symbol(
    'INCREMENT_COUNT_EFFECT'
);

container.register(INCREMENT_COUNT_EFFECT, {
    useClass: IncrementCountEffect
});
