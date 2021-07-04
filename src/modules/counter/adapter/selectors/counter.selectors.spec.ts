import { CounterState } from '@stores/domain/counter/counter.types';
import { runInReactiveContext } from '@testing-tools/testing-tools.helpers';
import { selectCount$, selectMultiplyCount$ } from './counter.selectors';

describe(`${selectCount$.name}`, () => {
    it('selects $count value from store', () => {
        const count = 3;
        const counter: CounterState = {
            count$: count
        };
        const result: number[] = [];
        runInReactiveContext(() => {
            const select = selectCount$({ counter });
            result.push(select);
        });
        expect(result).toEqual([count]);
    });
});

describe(`${selectMultiplyCount$.name}`, () => {
    it('selects $count value from store and multiply on predefined value', () => {
        const count = 3;
        const counter: CounterState = {
            count$: count
        };
        const factor = 4;
        const result: number[] = [];

        runInReactiveContext(() => {
            const select = selectMultiplyCount$(factor, { counter });
            result.push(select);
        });
        expect(result).toEqual([count * factor]);
    });
});
