import { flow, flowResult, makeObservable } from 'mobx';
import { CounterSource } from '@stores/persistence/counter-source.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import {
    EffectBuilder,
    EffectFlow
} from '@stores/helpers/effect/effect.helpers';
import { RootEffectMakeParams } from '@stores/root/root.types';

export class SaveCount implements Effect {
    static make({ persistence }: RootEffectMakeParams): SaveCount {
        const effectFlow = EffectFlow.make<number>();
        return new SaveCount(persistence.counterService, effectFlow);
    }

    constructor(
        private counterService: CounterSource,
        private effectFlow: EffectFlow<number>
    ) {
        makeObservable(this, {
            saveGenerator: flow
        });
    }

    execute(count: number): Promise<number> {
        this.effectFlow.promise = flowResult(this.saveGenerator(count));
        return this.effectFlow.promise;
    }

    *saveGenerator(count: number): Generator<Promise<number>, number, number> {
        const countDto = yield this.counterService.save(count);
        return countDto;
    }
}

export const saveCountEffect = EffectBuilder.make(SaveCount);
