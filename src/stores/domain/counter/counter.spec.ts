import { Selector } from '@stores/helpers/store.types';
import { container, injectable } from 'tsyringe';
import { constructor } from 'tsyringe/dist/typings/types';
import { CounterStore } from './counter.store';
import { CounterModel, CounterState } from './counter.types';

describe(`${CounterStore.name}`, () => {
    let initial: number;
    let store: CounterStore;
    beforeEach(() => {
        initial = 5;
        store = new CounterStore();
        store.setCount(initial);
    });
    afterEach(() => {
        container.reset();
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
    it('can be injected via abstract classes', () => {
        const initial = 0;
        container.registerSingleton(CounterStore);
        container.register(CounterState as constructor<CounterState>, {
            useToken: CounterStore
        });
        container.register(CounterModel as constructor<CounterModel>, {
            useToken: CounterStore
        });
        @injectable()
        class CountSelector implements Selector {
            constructor(private counterStore: CounterStore) {}
            get result(): number {
                return this.counterStore.count$;
            }
        }
        const counterState = container.resolve(
            CounterState as constructor<CounterState>
        );
        const counterModel = container.resolve(
            CounterModel as constructor<CounterModel>
        );
        const countSelector = container.resolve(CountSelector);

        expect(counterState === counterModel).toEqual(true);
        expect(countSelector.result).toEqual(initial);
    });
});
