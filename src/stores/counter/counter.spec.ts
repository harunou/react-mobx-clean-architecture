import { container } from 'tsyringe';
import { COUNTER_STATE, CounterStore } from './counter.store';
import { CounterState } from './counter.types';
import 'reflect-metadata';

describe(`${CounterStore.name}`, () => {
    let initial: CounterState;
    let store: CounterStore;
    beforeEach(() => {
        initial = {
            count$: 5
        };
        container.register(COUNTER_STATE, { useValue: initial });
        store = container.resolve(CounterStore);
    });
    afterEach(() => {
        container.clearInstances();
    });
    it('can be initialized with initial state', () => {
        expect(store.count$).toEqual(initial.count$);
    });
    it('sets new count state upon setState call', () => {
        const count = 7;
        store.setCount(count);
        expect(store.count$).toEqual(count);
    });
    it('increments state on provided value upon increment call', () => {
        const value = 4;
        store.increment(value);
        expect(store.count$).toEqual(initial.count$ + value);
    });
    it('decrements state on provided value upon decrement call', () => {
        const value = 4;
        store.decrement(value);
        expect(store.count$).toEqual(initial.count$ - value);
    });
});
