import { AppStore } from '@stores/app/app.store';
import { COUNTER_STATE } from '@stores/counter/counter.store';
import { CounterState } from '@stores/counter/counter.types';
import { PersistenceStore } from '@stores/persistence/persistence.store';
import { container } from 'tsyringe';
import { RootStore, ROOT_MODEL } from './root.store';
import { RootModel } from './root.types';

describe(`${RootStore.name}`, () => {
    let initial: CounterState;
    beforeEach(() => {
        initial = {
            count$: 5
        };
        container.register(COUNTER_STATE, { useValue: initial });
    });
    afterEach(() => {
        container.clearInstances();
    });
    it('exists only in one instance', () => {
        const rootStore0: RootModel = container.resolve(ROOT_MODEL);
        const rootStore1: RootModel = container.resolve(ROOT_MODEL);
        expect(rootStore0).toBeInstanceOf(RootStore);
        expect(rootStore1).toBeInstanceOf(RootStore);
        expect(rootStore0 === rootStore1).toEqual(true);
    });
    it('has AppModel and PersistenceModel', () => {
        const rootStore: RootModel = container.resolve(ROOT_MODEL);
        expect(rootStore.appStore).toBeInstanceOf(AppStore);
        expect(rootStore.persistenceStore).toBeInstanceOf(PersistenceStore);
    });
});
