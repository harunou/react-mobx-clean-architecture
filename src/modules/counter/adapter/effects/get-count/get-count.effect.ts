import { flow, flowResult, makeObservable } from 'mobx';
import { injectable } from 'tsyringe';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { makeCancellablePromiseStub } from '@stores/helpers/store.helpers';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CancellableEffect } from '@stores/helpers/store.types';

@injectable()
export class GetCountEffect implements CancellableEffect {
    constructor(private counterSource: CounterSource) {
        makeObservable(this, {
            getGenerator: flow
        });
    }

    #promise: CancellablePromise<number> = makeCancellablePromiseStub();

    cancel(): void {
        this.#promise.cancel();
    }

    execute(): Promise<number> {
        this.cancel();
        this.#promise = flowResult(this.getGenerator());
        return this.#promise;
    }

    *getGenerator(): Generator<Promise<number>, number, number> {
        return yield this.counterSource.get();
    }
}
