import { CounterState } from '@stores/domain/counter/counter.types';
import { runInReactiveContext } from '@testing-tools/testing-tools.helpers';
import { counterSelectors } from './counter.selectors';

describe(`${counterSelectors.selectCount.name}`, () => {
    it('selects $count value from store', () => {
        const count = 3;
        const counter: CounterState = {
            count$: count
        };
        const result: number[] = [];
        runInReactiveContext(() => {
            const select = counterSelectors.selectCount({ counter });
            result.push(select);
        });
        expect(result).toEqual([count]);
    });
});

describe(`${counterSelectors.selectMultiplyCount.name}`, () => {
    it('selects $count value from store and multiply on predefined value', () => {
        const count = 3;
        const counter: CounterState = {
            count$: count
        };
        const factor = 4;
        const result: number[] = [];

        runInReactiveContext(() => {
            const select = counterSelectors.selectMultiplyCount(factor, {
                counter
            });
            result.push(select);
        });
        expect(result).toEqual([count * factor]);
    });
});
