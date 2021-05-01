import { flow } from 'mobx';
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
        private flow: EffectFlow<number>
    ) {}

    execute(count: number): Promise<number> {
        this.flow.promise = flow(this.saveGenerator.bind(this))(count);
        return this.flow.promise;
    }

    private *saveGenerator(
        count: number
    ): Generator<Promise<number>, number, number> {
        const countDto = yield this.counterService.save(count);
        return countDto;
    }
}

export const saveCountEffect = EffectBuilder.make(SaveCount);
