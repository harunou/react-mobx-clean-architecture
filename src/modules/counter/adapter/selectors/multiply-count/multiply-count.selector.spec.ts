import { CounterState } from '@stores/counter/counter.types';
import { MultiplyCount } from './multiply-count.selector';

describe(`${MultiplyCount.name}`, () => {
    it('selects $count value from store and multiply on predefined value', () => {
        const count = 3;
        const state: CounterState = {
            $count: count
        };
        const factor = 4;
        const select = new MultiplyCount(state, factor);
        expect(select.result).toEqual(count * factor);
    });
});
