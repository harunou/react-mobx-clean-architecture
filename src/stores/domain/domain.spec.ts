import { container } from 'tsyringe';
import { CounterStore, COUNTER_INITIAL_VALUE } from './counter/counter.store';
import { COUNTER_INITIAL_STATE } from './counter/counter.tokens';
import { domainRegistry } from './domain.registry';

describe(`domainRegistry`, () => {
    it('has correct dependencies', () => {
        const child = container.createChildContainer();
        domainRegistry.forwardTo(child);
        expect(child.resolve(COUNTER_INITIAL_STATE)).toEqual(
            COUNTER_INITIAL_VALUE
        );
        expect(child.resolve(CounterStore)).toBeInstanceOf(CounterStore);
        expect(
            child.resolve(CounterStore) === child.resolve(CounterStore)
        ).toEqual(true);
    });
});
