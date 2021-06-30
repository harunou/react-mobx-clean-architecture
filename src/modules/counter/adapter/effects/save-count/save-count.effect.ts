import { flow, flowResult, makeObservable } from 'mobx';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { CancellablePromise } from 'mobx/dist/api/flow';

export class SaveCountEffect {
    constructor(private counterSource: CounterSource) {
        makeObservable(this, {
            saveGenerator: flow
        });
    }

    #promise: CancellablePromise<number> = makeCancellablePromiseStub();

    execute(count: number): Promise<number> {
        this.#promise = flowResult(this.saveGenerator(count));
        return this.#promise;
    }

    *saveGenerator(count: number): Generator<Promise<number>, number, number> {
        return yield this.counterSource.save(count);
    }
}
function makeCancellablePromiseStub(): CancellablePromise<number> {
    throw new Error('Function not implemented.');
}
