import { flow, flowResult, makeObservable } from 'mobx';
import { inject, injectable } from 'tsyringe';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { makeCancellablePromiseStub } from '@stores/helpers/store.helpers';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CancellableEffect } from '@stores/helpers/store.types';
import { CounterSourceStore } from '@stores/persistence/counter-source/counter-source.store';

@injectable()
export class IncrementCountEffect implements CancellableEffect {
    constructor(
        @inject(CounterSourceStore) private counterSource: CounterSource
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
