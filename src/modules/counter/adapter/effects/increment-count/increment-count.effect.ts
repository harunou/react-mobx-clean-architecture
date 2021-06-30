import { flow, flowResult, makeObservable } from 'mobx';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { CancellablePromise } from 'mobx/dist/api/flow';

export class IncrementCountEffect {
    constructor(private counterSource: CounterSource) {
        makeObservable(this, {
            incrementGenerator: flow
        });
    }

    #promise: CancellablePromise<number> = makeCancellablePromiseStub();

    cancel(): void {
        this.#promise.cancel();
    }

    execute(increment: number): Promise<number> {
        this.#promise = flowResult(this.incrementGenerator(increment));
        return this.#promise;
    }

    *incrementGenerator(
        value: number
    ): Generator<Promise<number>, number, number> {
        return yield this.counterSource.increment(value);
    }
}
function makeCancellablePromiseStub(): CancellablePromise<number> {
    throw new Error('Function not implemented.');
}
