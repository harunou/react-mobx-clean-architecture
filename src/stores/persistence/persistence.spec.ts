import { registerInContainer } from '@stores/helpers/store.helpers';
import { container } from 'tsyringe';
import { CounterSourceStore } from './counter-source/counter-source.store';
import { COUNTER_SOURCE_STORE } from './counter-source/counter-source.tokens';
import { persistenceModule } from './persistence.module';

describe(`${persistenceModule}`, () => {
    it('has correct dependencies', () => {
        const child = container.createChildContainer();
        registerInContainer(child, persistenceModule);
        expect(child.resolve(COUNTER_SOURCE_STORE)).toBeInstanceOf(
            CounterSourceStore
        );
    });
});
