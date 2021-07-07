import { CounterState } from '@stores/domain/counter/counter-store.types';
import { selector } from '@stores/helpers/stores.helpers';

const selectCount = selector(
    (stores: { counter: CounterState }) => stores.counter.count$
);

const selectMultiplyCount = selector(
    (factor: number, stores: { counter: CounterState }) =>
        stores.counter.count$ * factor
);

export const counterSelectors = {
    selectCount,
    selectMultiplyCount
};
