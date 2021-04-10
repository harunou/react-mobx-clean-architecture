import { DomainStore } from './domainStore';

describe(`${DomainStore.name}`, () => {
    it('initializing with a value', () => {
        const init = 3;
        const store = DomainStore.make({ $count: init });
        expect(store.$count).toEqual(init);
    });
    it('changes count upon setCount method call', () => {
        const init = 3;
        const value = 7;
        const store = DomainStore.make({ $count: init });
        store.setCount(value);
        expect(store.$count).toEqual(value);
    });
});
