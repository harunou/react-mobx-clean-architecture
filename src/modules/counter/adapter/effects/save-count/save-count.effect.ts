import { flow, flowResult, makeObservable } from 'mobx';
import { Effect } from '@stores/helpers/effect/effect.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { PERSISTENCE_STORE } from '@stores/persistence/persistence.store';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import { PersistenceModel } from '@stores/persistence/persistence.types';
import { CounterSource } from '@stores/persistence/counter-source.types';

@injectable()
export class SaveCountEffect implements Effect {
    constructor(
        @inject(PERSISTENCE_STORE) private persistenceStore: PersistenceModel,
        private effectFlow: EffectFlow<number>
    ) {
        makeObservable(this, {
            saveGenerator: flow
        });
    }

    private get counterSource(): CounterSource {
        return this.persistenceStore.counterRemoteService;
    }

    execute(count: number): Promise<number> {
        this.effectFlow.promise = flowResult(this.saveGenerator(count));
        return this.effectFlow.promise;
    }

    *saveGenerator(count: number): Generator<Promise<number>, number, number> {
        return yield this.counterSource.save(count);
    }
}

export const SAVE_COUNT_EFFECT: InjectionToken<Effect> = Symbol(
    'SAVE_COUNT_EFFECT'
);

container.register(SAVE_COUNT_EFFECT, {
    useClass: SaveCountEffect
});
