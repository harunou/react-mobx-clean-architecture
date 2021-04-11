import { CounterState } from '../../../stores/counter/counter.types';
import { MultiplyCount } from './multiply-count.selector';

describe(`${MultiplyCount.name}`, () => {
    it('selects $count value from domain store and multiply on predefined value', () => {
        const state: CounterState = {
            $count: 3
        };
        const multiplyAmount = 4;
        const select = new MultiplyCount(state, multiplyAmount);
        expect(select.result).toEqual(12);
    });
});
