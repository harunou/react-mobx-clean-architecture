import { CounterState } from '@stores/counter/counter.types';
import { MultiplyCountSelector } from './multiply-count.selector';

describe(`${MultiplyCountSelector.name}`, () => {
    it('selects $count value from store and multiply on predefined value', () => {
        const count = 3;
        const state: CounterState = {
            count$: count
        };
        const factor = 4;
        const select = new MultiplyCountSelector(state);
        expect(select.withProps(4).result).toEqual(count * factor);
    });
});
