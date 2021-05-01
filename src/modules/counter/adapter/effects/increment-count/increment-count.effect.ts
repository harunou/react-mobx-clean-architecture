import { flow } from 'mobx';
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
        return new IncrementCount(persistence.counterService, effectFlow);
    }

    constructor(
        private counterService: CounterSource,
        private flow: EffectFlow<number>
    ) {}

    cancel(): void {
        this.flow.cancel();
    }

    execute(increment: number): Promise<number> {
        this.flow.promise = flow(this.saveGenerator.bind(this))(increment);
        return this.flow.promise;
    }

    private *saveGenerator(
        value: number
    ): Generator<Promise<number>, number, number> {
        const countDto = yield this.counterService.increment(value);
        return countDto;
    }
}

export const incrementCountEffect = EffectBuilder.make(IncrementCount);
