import { container } from 'tsyringe';
import { CounterStore } from './counter/counter.store';
import { domainRegistry } from './domain.registry';

describe(`domainRegistry`, () => {
    it('has correct dependencies', () => {
        const child = container.createChildContainer();
        domainRegistry.forwardTo(child);
        expect(child.resolve(CounterStore)).toBeInstanceOf(CounterStore);
        expect(
            child.resolve(CounterStore) === child.resolve(CounterStore)
        ).toEqual(true);
    });
});
