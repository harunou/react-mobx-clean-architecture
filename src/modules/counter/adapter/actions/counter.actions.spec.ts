import { CounterStore } from '@stores/domain/counter/counter.store';
import {
    getCounterSuccessAction,
    incrementCounterRequestedAction,
    incrementCounterSuccessAction,
    saveCounterFailureAction
} from './counter.actions';

describe(`${incrementCounterRequestedAction.name}`, () => {
    it('increments count', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        incrementCounterRequestedAction(value, { counter });
        expect(counter.count$).toEqual(value + initial);
    });
});

describe(`${incrementCounterSuccessAction.name}`, () => {
    it('increments count', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        incrementCounterSuccessAction(value, { counter });
        expect(counter.count$).toEqual(value + initial);
    });
});

describe(`${saveCounterFailureAction.name}`, () => {
    it('decrements counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        saveCounterFailureAction(value, { counter });
        expect(counter.count$).toEqual(initial - value);
    });
});

describe(`${getCounterSuccessAction.name}`, () => {
    it('sets counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        getCounterSuccessAction(value, { counter });
        expect(counter.count$).toEqual(value);
    });
});
