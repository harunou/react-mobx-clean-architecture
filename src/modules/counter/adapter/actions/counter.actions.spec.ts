import { CounterStore } from '@stores/domain/counter/counter.store';
import {
    getCounterEffectSuccess,
    incrementCounterRequested,
    incrementCounterEffectSuccess,
    setCounterEffectFailure
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

describe(`${incrementCounterEffectSuccess.name}`, () => {
    it('increments count', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        incrementCounterEffectSuccess(value, { counter });
        expect(counter.count$).toEqual(value);
    });
});

describe(`${setCounterEffectFailure.name}`, () => {
    it('decrements counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        setCounterEffectFailure(value, { counter });
        expect(counter.count$).toEqual(initial - value);
    });
});

describe(`${getCounterEffectSuccess.name}`, () => {
    it('sets counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        getCounterEffectSuccess(value, { counter });
        expect(counter.count$).toEqual(value);
    });
});
