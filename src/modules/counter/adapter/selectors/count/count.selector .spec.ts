import { CounterState } from '@stores/counter/counter.types';
import { Count } from './count.selector';

describe(`${Count.name}`, () => {
    it('selects $count value from store', () => {
        const count = 3;
        const state: CounterState = {
            $count: count
        };
        const select = new Count(state);
        expect(select.result).toEqual(count);
    });
});
