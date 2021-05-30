import { flow, flowResult, makeObservable } from 'mobx';
import { CounterSource } from '@stores/persistence/counter-source.types';
import { CancellableEffect } from '@stores/helpers/effect/effect.types';
import {
    EffectBuilder,
    EffectFlow
} from '@stores/helpers/effect/effect.helpers';
import { RootEffectMakeParams } from '@stores/root/root.types';

export class IncrementCount implements CancellableEffect {
    static make({ persistence }: RootEffectMakeParams): IncrementCount {
        const effectFlow = EffectFlow.make<number>();
        return new IncrementCount(persistence.counterRemoteService, effectFlow);
    }

    constructor(
        private counterService: CounterSource,
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
        return yield this.counterService.increment(value);
    }
}

export const incrementCountEffect = EffectBuilder.make(IncrementCount);
