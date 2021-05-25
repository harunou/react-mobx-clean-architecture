import { CounterStore } from './counter.store';
import { CounterState } from './counter.types';

// eslint-disable-next-line jest/no-disabled-tests
describe.skip(`${CounterStore.name}`, () => {
    let initial: CounterState;
    let store: CounterStore;
    beforeEach(() => {
        initial = {
            $count: 5
        };
        store = CounterStore.make(initial);
    });
    it('can be initialized with initial state', () => {
        expect(store.$count).toEqual(initial.$count);
    });
    it('changes changes state upon setState call', () => {
        const count = 7;
        store.setCount(count);
        expect(store.$count).toEqual(count);
    });
    it('increments state on provided value upon increment call', () => {
        const value = 4;
        store.increment(value);
        expect(store.$count).toEqual(initial.$count + value);
    });
    it('decrements state on provided value upon decrement call', () => {
        const value = 4;
        store.decrement(value);
        expect(store.$count).toEqual(initial.$count - value);
    });
});
