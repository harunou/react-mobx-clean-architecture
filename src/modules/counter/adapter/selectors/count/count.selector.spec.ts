import { CounterState } from '@stores/domain/counter/counter.types';
import { CountSelector } from './count.selector';

describe(`${CountSelector.name}`, () => {
    it('selects $count value from store', () => {
        const count = 3;
        const state: CounterState = {
            count$: count
        };
        const select = new CountSelector(state);
        expect(select.result).toEqual(count);
    });
});
