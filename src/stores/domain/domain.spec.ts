import { registerInContainer } from '@stores/helpers/store.helpers';
import { container } from 'tsyringe';
import { CounterStore } from './counter/counter.store';
import { COUNTER_INITIAL_STATE, COUNTER_STORE } from './counter/counter.tokens';
import { COUNTER_INITIAL_VALUE, domainModule } from './domain.module';

describe(`${domainModule}`, () => {
    it('has correct dependencies', () => {
        const child = container.createChildContainer();
        registerInContainer(child, domainModule);
        expect(child.resolve(COUNTER_INITIAL_STATE)).toEqual(
            COUNTER_INITIAL_VALUE
        );
        expect(child.resolve(COUNTER_STORE)).toBeInstanceOf(CounterStore);
    });
});
