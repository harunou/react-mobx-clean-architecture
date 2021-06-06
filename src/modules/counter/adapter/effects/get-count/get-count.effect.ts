import { flow, flowResult, makeObservable } from 'mobx';
import { CancellableEffect } from '@stores/helpers/effect/effect.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { PERSISTENCE_STORE } from '@stores/persistence/persistence.store';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import { PersistenceModel } from '@stores/persistence/persistence.types';
import { CounterSource } from '@stores/persistence/counter-source.types';

@injectable()
export class GetCountEffect implements CancellableEffect {
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

    cancel(): void {
        this.effectFlow.cancel();
    }

    execute(): Promise<number> {
        this.effectFlow.promise = flowResult(this.saveGenerator());
        return this.effectFlow.promise;
    }

    *saveGenerator(): Generator<Promise<number>, number, number> {
        return yield this.counterSource.get();
    }
}

export const GET_COUNT_EFFECT: InjectionToken<GetCountEffect> = Symbol(
    'GET_COUNT_EFFECT'
);

container.register(GET_COUNT_EFFECT, {
    useClass: GetCountEffect
});
