import { container } from 'tsyringe';
import { CounterSourceStore } from './counter-source/counter-source.store';
import { COUNTER_SOURCE_STORE } from './counter-source/counter-source.tokens';
import { persistenceRegistry } from './persistence.registry';

describe(`persistenceModule`, () => {
    it('has correct dependencies', () => {
        const child = container.createChildContainer();
        persistenceRegistry.forwardTo(child);
        expect(child.resolve(COUNTER_SOURCE_STORE)).toBeInstanceOf(
            CounterSourceStore
        );
        expect(
            child.resolve(COUNTER_SOURCE_STORE) ===
                child.resolve(COUNTER_SOURCE_STORE)
        ).toEqual(true);
    });
});
