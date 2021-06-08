import { container } from 'tsyringe';
import { CounterStore } from './counter/counter.store';
import { COUNTER_INITIAL_STATE, COUNTER_STORE } from './counter/counter.tokens';
import { COUNTER_INITIAL_VALUE, domainRegistry } from './domain.registry';

describe(`domainRegistry`, () => {
    it('has correct dependencies', () => {
        const child = container.createChildContainer();
        domainRegistry.applyTo(child);
        expect(child.resolve(COUNTER_INITIAL_STATE)).toEqual(
            COUNTER_INITIAL_VALUE
        );
        expect(child.resolve(COUNTER_STORE)).toBeInstanceOf(CounterStore);
        expect(
            child.resolve(COUNTER_STORE) === child.resolve(COUNTER_STORE)
        ).toEqual(true);
    });
});
