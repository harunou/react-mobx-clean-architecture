import { Selector } from '@stores/helpers/store.types';
import { container, injectable } from 'tsyringe';
import { constructor } from 'tsyringe/dist/typings/types';
import { CounterStore } from './counter.store';
import { COUNTER_INITIAL_STATE } from './counter.tokens';
import { CounterState } from './counter.types';

describe(`${CounterStore.name}`, () => {
    let initial: CounterState;
    let store: CounterStore;
    beforeEach(() => {
        initial = {
            count$: 5
        };
        store = new CounterStore(initial);
    });
    afterEach(() => {
        container.reset();
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
    it('can be injected via abstract classes', () => {
        const initial = 5;
        container.register(COUNTER_INITIAL_STATE, {
            useValue: { count$: initial }
        });
        container.registerSingleton(CounterStore);
        container.registerType(
            CounterState as constructor<CounterState>,
            CounterStore
        );
        @injectable()
        class CountSelector implements Selector {
            constructor(private counterStore: CounterStore) {}
            get result(): number {
                return this.counterStore.count$;
            }
        }
        container.registerSingleton(CountSelector);
        const countSelector = container.resolve(CountSelector);
        expect(countSelector.result).toEqual(initial);
    });
});
