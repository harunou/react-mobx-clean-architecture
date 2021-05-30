import { flow, flowResult, makeObservable } from 'mobx';
import { CounterSource } from '@stores/persistence/counter-source.types';
import { CancellableEffect } from '@stores/helpers/effect/effect.types';
import {
    EffectBuilder,
    EffectFlow
} from '@stores/helpers/effect/effect.helpers';
import { RootEffectMakeParams } from '@stores/root/root.types';

export class GetCount implements CancellableEffect {
    static make({ persistence }: RootEffectMakeParams): GetCount {
        const effectFlow = EffectFlow.make<number>();
        return new GetCount(persistence.counterRemoteService, effectFlow);
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

    execute(): Promise<number> {
        this.effectFlow.promise = flowResult(this.saveGenerator());
        return this.effectFlow.promise;
    }

    *saveGenerator(): Generator<Promise<number>, number, number> {
        return yield this.counterService.get();
    }
}

export const getCountEffect = EffectBuilder.make(GetCount);
