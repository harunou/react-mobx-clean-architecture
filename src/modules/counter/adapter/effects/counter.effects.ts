import { CounterSourceModel } from '@stores/persistence/counter-source/counter-source.types';
import { effect } from '@stores/helpers/stores.helpers';

const setCounter = effect(function* setCountGenerator(
    value: number,
    stores: { counterSource: CounterSourceModel }
): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.set(value);
});

const getCounter = effect(function* getCountGenerator(stores: {
    counterSource: CounterSourceModel;
}): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.get();
});

const incrementCounter = effect(function* incrementCountGenerator(
    value: number,
    stores: { counterSource: CounterSourceModel }
): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.increment(value);
});

export const counterEffects = {
    setCounter,
    getCounter,
    incrementCounter
};
