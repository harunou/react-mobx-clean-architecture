import { flow, flowResult, makeObservable } from 'mobx';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { CancellablePromise } from 'mobx/dist/api/flow';

export class GetCountEffect {
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
function makeCancellablePromiseStub(): CancellablePromise<number> {
    throw new Error('Function not implemented.');
}
