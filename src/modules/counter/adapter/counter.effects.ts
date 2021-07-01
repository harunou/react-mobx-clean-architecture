import { CounterSourceModel } from '@stores/persistence/counter-source/counter-source.types';
import { CancellablePromise, flow } from 'mobx/dist/internal';

const runInFlow = <R>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generator: () => Generator<any, R, any> | AsyncGenerator<any, R, any>
): CancellablePromise<R> => {
    return flow(generator)();
};

export const saveCountEffect = flow(function* saveCountEffectGenerator(
    value: number,
    stores: { counterSource: CounterSourceModel }
): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.save(value);
});

export const incrementCountEffect = (
    counterSource: CounterSourceModel,
    value: number
): CancellablePromise<number> => {
    return runInFlow(function* saveCountEffectGenerator(): Generator<
        Promise<number>,
        number,
        number
    > {
        return yield counterSource.increment(value);
    });
};

export const getCountEffect = (
    counterSource: CounterSourceModel
) => (): CancellablePromise<number> => {
    return runInFlow(function* saveCountEffectGenerator(): Generator<
        Promise<number>,
        number,
        number
    > {
        return yield counterSource.get();
    });
};