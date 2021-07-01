import { CounterState } from '@stores/domain/counter/counter.types';
import { runInReactiveContext } from '@testing-tools/testing-tools.helpers';
import { countSelector, multiplyCountSelector } from './counter.selectors';

describe(`${countSelector.name}`, () => {
    it('selects $count value from store', () => {
        const count = 3;
        const counter: CounterState = {
            count$: count
        };
        const result: number[] = [];
        runInReactiveContext(() => {
            const select = countSelector({ counter });
            result.push(select);
        });
        expect(result).toEqual([count]);
    });
});

describe(`${multiplyCountSelector.name}`, () => {
    it('selects $count value from store and multiply on predefined value', () => {
        const count = 3;
        const counter: CounterState = {
            count$: count
        };
        const factor = 4;
        const result: number[] = [];

        runInReactiveContext(() => {
            const select = multiplyCountSelector(factor, { counter });
            result.push(select);
        });
        expect(result).toEqual([count * factor]);
    });
});
