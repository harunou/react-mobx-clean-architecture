import { CounterStore } from './counter-store';

describe(`${CounterStore.name}`, () => {
    let initial: number;
    let store: CounterStore;
    beforeEach(() => {
        initial = 5;
        store = new CounterStore(initial);
    });
    it('sets new count state upon setState call', () => {
        const count = 7;
        store.setCount(count);
        expect(store.count$).toEqual(count);
    });
    it('increments state on provided value upon increment call', () => {
        const value = 4;
        store.increment(value);
        expect(store.count$).toEqual(initial + value);
    });
    it('decrements state on provided value upon decrement call', () => {
        const value = 4;
        store.decrement(value);
        expect(store.count$).toEqual(initial - value);
    });
});
