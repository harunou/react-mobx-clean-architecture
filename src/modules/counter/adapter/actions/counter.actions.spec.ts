import { CounterStore } from '@stores/domain/counter/counter-store';
import { counterActions } from './counter.actions';

describe(`${counterActions.incrementCounter.name}`, () => {
    it('increments count', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        counterActions.incrementCounter(value, { counter });
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

describe(`${counterActions.saveCounterEffectFailure.name}`, () => {
    it('decrements counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        counterActions.saveCounterEffectFailure(value, { counter });
        expect(counter.count$).toEqual(initial - value);
    });
});

describe(`${counterActions.fetchCounterEffectSuccess.name}`, () => {
    it('sets counter', () => {
        const initial = 5;
        const value = 3;
        const counter = new CounterStore(initial);
        counterActions.fetchCounterEffectSuccess(value, { counter });
        expect(counter.count$).toEqual(value);
    });
});
