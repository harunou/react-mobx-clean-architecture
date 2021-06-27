import { container } from 'tsyringe';
import { CounterSourceStore } from './counter-source/counter-source.store';
import { persistenceRegistry } from './persistence.registry';

describe(`persistenceModule`, () => {
    it('has correct dependencies', () => {
        const child = container.createChildContainer();
        persistenceRegistry.forwardTo(child);
        expect(child.resolve(CounterSourceStore)).toBeInstanceOf(
            CounterSourceStore
        );
        expect(
            child.resolve(CounterSourceStore) ===
                child.resolve(CounterSourceStore)
        ).toEqual(true);
    });
});
