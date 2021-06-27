import { flow, flowResult, makeObservable } from 'mobx';
import { inject, injectable } from 'tsyringe';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { makeCancellablePromiseStub } from '@stores/helpers/store.helpers';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CancellableEffect } from '@stores/helpers/store.types';
import { CounterSourceStore } from '@stores/persistence/counter-source/counter-source.store';

@injectable()
export class GetCountEffect implements CancellableEffect {
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

    execute(): Promise<number> {
        this.cancel();
        this.#promise = flowResult(this.saveGenerator());
        return this.#promise;
    }

    *saveGenerator(): Generator<Promise<number>, number, number> {
        return yield this.counterSource.get();
    }
}
