import { flow, flowResult, makeObservable } from 'mobx';
import { CancellableEffect } from '@stores/helpers/effect/effect.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import { CounterSource } from '@stores/counter-source/counter-source.types';
import { COUNTER_SOURCE_STORE } from '@stores/root/root.store';

@injectable()
export class GetCountEffect implements CancellableEffect {
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

    execute(): Promise<number> {
        this.effectFlow.promise = flowResult(this.saveGenerator());
        return this.effectFlow.promise;
    }

    *saveGenerator(): Generator<Promise<number>, number, number> {
        return yield this.counterSource.get();
    }
}

export const GET_COUNT_EFFECT: InjectionToken<GetCountEffect> = Symbol(
    'GET_COUNT_EFFECT'
);

container.register(GET_COUNT_EFFECT, {
    useClass: GetCountEffect
});
