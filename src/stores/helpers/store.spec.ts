import { container, InjectionToken } from 'tsyringe';
import { Registry } from './registry/registry';
import { makeInjectionToken, makeRootContainer } from './store.helpers';

describe(`${makeRootContainer.name}`, () => {
    let TOKEN: InjectionToken<number>;
    let registry: Registry;
    beforeEach(() => {
        TOKEN = makeInjectionToken('token');
        registry = Registry.make().add({
            token: TOKEN,
            useValue: 5
        });
    });
    it('creates child of global container', () => {
        const rootContainer = makeRootContainer(registry);
        expect(container === rootContainer).toEqual(false);
    });
    it('creates container with injected registry', () => {
        const rootContainer = makeRootContainer(registry);
        expect(container.isRegistered(TOKEN)).toEqual(false);
        expect(rootContainer.isRegistered(TOKEN)).toEqual(true);
    });
});
