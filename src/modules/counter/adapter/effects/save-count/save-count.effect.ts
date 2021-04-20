import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CounterDataSource } from '@api/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import {
    EffectBuilder,
    EffectFlow
} from '@stores/helpers/effect/effect.helpers';
import { RootEffectMakeParams } from '@stores/root/root.types';

export class SaveCount implements Effect {
    static make({ persistence }: RootEffectMakeParams): SaveCount {
        const effectFlow = EffectFlow.make<number>();
        return new SaveCount(persistence.counterDataSource, effectFlow);
    }

    constructor(
        private counterDataSource: CounterDataSource,
        private flow: EffectFlow<number>
    ) {}

    execute(count: number): CancellablePromise<number> {
        this.flow.cancel();
        this.flow.promise = flow(this.saveGenerator.bind(this))(count);
        return this.flow.promise;
    }

    private *saveGenerator(
        count: number
    ): Generator<Promise<number>, number, number> {
        const countDto = yield this.counterDataSource.saveSuccess(count);
        return countDto;
    }
}

const saveCountSuccessEffect = EffectBuilder.make(SaveCount);
export default saveCountSuccessEffect;
