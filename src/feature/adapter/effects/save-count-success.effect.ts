import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CounterDataSource } from '@api/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import {
    EffectBuilder,
    EffectFlow
} from '@stores/helpers/effect/effect.helpers';
import { RootEffectMakeParams } from '@stores/root/root.types';

export class SaveCountSuccess implements Effect {
    static make({ persistence }: RootEffectMakeParams): SaveCountSuccess {
        const effectFlow = EffectFlow.make<number>();
        return new SaveCountSuccess(persistence.counterDataSource, effectFlow);
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
        const countDto = yield this.counterDataSource.set(count);
        return countDto;
    }
}

export const saveCountSuccessEffect = EffectBuilder.make(SaveCountSuccess);
