import { CounterSourceModel } from '@stores/persistence/counter-source/counter-source.types';
import { effect } from '@stores/helpers/stores.helpers';

export const saveCountEffect = effect(function* saveCountEffectGenerator(
    value: number,
    stores: { counterSource: CounterSourceModel }
): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.save(value);
});

export const incrementCountEffect = effect(
    function* incrementCountEffectGenerator(
        value: number,
        stores: { counterSource: CounterSourceModel }
    ): Generator<Promise<number>, number, number> {
        return yield stores.counterSource.increment(value);
    }
);

export const getCountEffect = effect(function* getCountEffectGenerator(stores: {
    counterSource: CounterSourceModel;
}): Generator<Promise<number>, number, number> {
    return yield stores.counterSource.get();
});
