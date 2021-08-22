import { CounterSourceModel } from '@stores/persistence/counter-source/counter-source-store.types';
import { effect } from '@stores/helpers/stores.helpers';

const saveCounter = effect(function* saveCounterGenerator(
    value: number,
    stores: { counterSource: CounterSourceModel }
): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.set(value);
});

const fetchCounter = effect(function* fetchCounterGenerator(stores: {
    counterSource: CounterSourceModel;
}): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.get();
});

const incrementCounter = effect(function* incrementCounterGenerator(
    value: number,
    stores: { counterSource: CounterSourceModel }
): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.increment(value);
});

export const counterEffects = {
    saveCounter,
    fetchCounter,
    incrementCounter
};
