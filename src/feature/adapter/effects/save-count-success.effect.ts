import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CounterDataSource } from '@api/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import { EffectBuilder } from '@stores/helpers/effect/effect.helpers';
import { RootEffectParams } from '@stores/root/root.types';

export class SaveCountSuccess implements Effect {
    static flow: CancellablePromise<number>;
    static make({ persistence }: RootEffectParams): SaveCountSuccess {
        return new SaveCountSuccess(persistence.counterDataSource);
    }

    constructor(private counterDataSource: CounterDataSource) {}

    execute(count: number): CancellablePromise<number> {
        if (SaveCountSuccess.flow) {
            SaveCountSuccess.flow.cancel();
        }
        SaveCountSuccess.flow = flow(this.saveGenerator.bind(this))(count);
        return SaveCountSuccess.flow;
    }

    private *saveGenerator(
        count: number
    ): Generator<Promise<number>, number, number> {
        const countDto = yield this.counterDataSource.saveSuccess(count);
        return countDto;
    }
}

export const saveCountSuccessEffect = EffectBuilder.make(SaveCountSuccess);
