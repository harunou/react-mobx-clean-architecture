import { flow, flowResult, makeObservable } from 'mobx';
import { Effect } from '@stores/helpers/effect/effect.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { inject, injectable } from 'tsyringe';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { COUNTER_SOURCE_STORE } from '@stores/persistence/counter-source/counter-source.tokens';

@injectable()
export class SaveCountEffect implements Effect {
    constructor(
        @inject(COUNTER_SOURCE_STORE) private counterSource: CounterSource,
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
        return yield this.counterSource.save(count);
    }
}
