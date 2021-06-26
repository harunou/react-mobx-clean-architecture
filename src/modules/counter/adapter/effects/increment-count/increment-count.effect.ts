import { flow, flowResult, makeObservable } from 'mobx';
import { inject, injectable } from 'tsyringe';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { COUNTER_SOURCE_STORE } from '@stores/persistence/counter-source/counter-source.tokens';
import { makeCancellablePromiseStub } from '@stores/helpers/store.helpers';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CancellableEffect } from '@stores/helpers/store.types';

@injectable()
export class IncrementCountEffect implements CancellableEffect {
    constructor(
        @inject(COUNTER_SOURCE_STORE) private counterSource: CounterSource
    ) {
        makeObservable(this, {
            saveGenerator: flow
        });
    }

    #promise: CancellablePromise<number> = makeCancellablePromiseStub();

    cancel(): void {
        this.#promise.cancel();
    }

    execute(increment: number): Promise<number> {
        this.#promise = flowResult(this.saveGenerator(increment));
        return this.#promise;
    }

    *saveGenerator(value: number): Generator<Promise<number>, number, number> {
        return yield this.counterSource.increment(value);
    }
}
