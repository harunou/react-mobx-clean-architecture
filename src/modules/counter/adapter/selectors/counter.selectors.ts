import { CounterState } from '@stores/domain/counter/counter.types';
import { selector } from '@stores/helpers/stores.helpers';

export const countSelector = selector(
    (stores: { counter: CounterState }) => stores.counter.count$
);

export const multiplyCountSelector = selector(
    (factor: number, stores: { counter: CounterState }) =>
        stores.counter.count$ * factor
);
