import { flow } from 'mobx';
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
        return new GetCount(persistence.counterService, effectFlow);
    }

    constructor(
        private counterService: CounterSource,
        private flow: EffectFlow<number>
    ) {}

    cancel(): void {
        this.flow.cancel();
    }

    execute(): Promise<number> {
        this.flow.promise = flow(this.saveGenerator.bind(this))();
        return this.flow.promise;
    }

    private *saveGenerator(): Generator<Promise<number>, number, number> {
        const countDto = yield this.counterService.get();
        return countDto;
    }
}

export const getCountEffect = EffectBuilder.make(GetCount);
