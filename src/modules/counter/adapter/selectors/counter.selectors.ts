import { CounterState } from '@stores/domain/counter/counter.types';
import { selector } from '@stores/helpers/stores.helpers';

export const selectCount$ = selector(
    (stores: { counter: CounterState }) => stores.counter.count$
);

export const selectMultiplyCount$ = selector(
    (factor: number, stores: { counter: CounterState }) =>
        stores.counter.count$ * factor
);
