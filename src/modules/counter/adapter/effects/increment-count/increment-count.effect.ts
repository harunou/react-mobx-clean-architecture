import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CounterDataSource } from '@api/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import {
    EffectBuilder,
    EffectFlow
} from '@stores/helpers/effect/effect.helpers';
import { RootEffectMakeParams } from '@stores/root/root.types';

export class IncrementCount implements Effect {
    static make({ persistence }: RootEffectMakeParams): IncrementCount {
        const effectFlow = EffectFlow.make<number>();
        return new IncrementCount(persistence.counterDataSource, effectFlow);
    }

    constructor(
        private counterDataSource: CounterDataSource,
        private flow: EffectFlow<number>
    ) {}

    execute(increment: number): CancellablePromise<number> {
        this.flow.cancel();
        this.flow.promise = flow(this.saveGenerator.bind(this))(increment);
        return this.flow.promise;
    }

    private *saveGenerator(
        value: number
    ): Generator<Promise<number>, number, number> {
        const countDto = yield this.counterDataSource.increment(value);
        return countDto;
    }
}

export const incrementCountEffect = EffectBuilder.make(IncrementCount);
