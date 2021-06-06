import { flow, flowResult, makeObservable } from 'mobx';
import { CancellableEffect } from '@stores/helpers/effect/effect.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import { PERSISTENCE_STORE } from '@stores/persistence/persistence.store';
import { PersistenceModel } from '@stores/persistence/persistence.types';
import { CounterSource } from '@stores/persistence/counter-source.types';

@injectable()
export class IncrementCountEffect implements CancellableEffect {
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

    execute(increment: number): Promise<number> {
        this.effectFlow.promise = flowResult(this.saveGenerator(increment));
        return this.effectFlow.promise;
    }

    *saveGenerator(value: number): Generator<Promise<number>, number, number> {
        return yield this.counterSource.increment(value);
    }
}

export const INCREMENT_COUNT_EFFECT: InjectionToken<CancellableEffect> = Symbol(
    'INCREMENT_COUNT_EFFECT'
);

container.register(INCREMENT_COUNT_EFFECT, {
    useClass: IncrementCountEffect
});
