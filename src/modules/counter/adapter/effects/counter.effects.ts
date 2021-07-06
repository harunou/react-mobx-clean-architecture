import { CounterSourceModel } from '@stores/persistence/counter-source/counter-source.types';
import { effect } from '@stores/helpers/stores.helpers';

export const setCounterEffect = effect(function* setCountEffectGenerator(
    value: number,
    stores: { counterSource: CounterSourceModel }
): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.set(value);
});

export const getCounterEffect = effect(
    function* getCountEffectGenerator(stores: {
        counterSource: CounterSourceModel;
    }): Generator<Promise<number>, number, number> {
        return yield stores.counterSource.get();
    }
);

export const incrementCounterEffect = effect(
    function* incrementCountEffectGenerator(
        value: number,
        stores: { counterSource: CounterSourceModel }
    ): Generator<Promise<number>, number, number> {
        return yield stores.counterSource.increment(value);
    }
);
