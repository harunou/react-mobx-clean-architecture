import { CounterStore } from '@stores/domain/counter/counter.store';
import {
    getCounterSuccess,
    incrementCounterRequested,
    incrementCounterSuccess,
    saveCounterFailure
} from './counter.actions';

describe(`${incrementCounterRequested.name}`, () => {
    it('increments count', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        incrementCounterRequested(value, { counter });
        expect(counter.count$).toEqual(value + initial);
    });
});

describe(`${incrementCounterSuccess.name}`, () => {
    it('increments count', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        incrementCounterSuccess(value, { counter });
        expect(counter.count$).toEqual(value);
    });
});

describe(`${saveCounterFailure.name}`, () => {
    it('decrements counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        saveCounterFailure(value, { counter });
        expect(counter.count$).toEqual(initial - value);
    });
});

describe(`${getCounterSuccess.name}`, () => {
    it('sets counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        getCounterSuccess(value, { counter });
        expect(counter.count$).toEqual(value);
    });
});
