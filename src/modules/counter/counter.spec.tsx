import { AppState } from '@stores/app/app.types';
import { render } from '@testing-library/react';
import { Counter } from './counter';
import { RootStore, RootStoreContext } from '@stores/root/root.store';
import { httpClient } from '@core/http-client';

describe(`${Counter.name}`, () => {
    const initial: AppState = {
        counter: {
            $count: 0
        }
    };
    let rootStore: RootStore;

    beforeEach(() => {
        rootStore = RootStore.make(initial);
    });

    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });

    it('renders without errors', () => {
        expect(() =>
            render(
                <RootStoreContext.Provider value={rootStore}>
                    <Counter />
                </RootStoreContext.Provider>
            )
        ).not.toThrow();
    });
});
