import { CounterStore } from '@stores/domain/counter/counter-store';
import { counterActions } from './counter.actions';

describe(`${counterActions.incrementCounterRequested.name}`, () => {
    it('increments count', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        counterActions.incrementCounterRequested(value, { counter });
        expect(counter.count$).toEqual(value + initial);
    });
});

describe(`${counterActions.incrementCounterEffectSuccess.name}`, () => {
    it('increments count', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        counterActions.incrementCounterEffectSuccess(value, { counter });
        expect(counter.count$).toEqual(value);
    });
});

describe(`${counterActions.setCounterEffectFailure.name}`, () => {
    it('decrements counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        counterActions.setCounterEffectFailure(value, { counter });
        expect(counter.count$).toEqual(initial - value);
    });
});

describe(`${counterActions.getCounterEffectSuccess.name}`, () => {
    it('sets counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        counterActions.getCounterEffectSuccess(value, { counter });
        expect(counter.count$).toEqual(value);
    });
});
