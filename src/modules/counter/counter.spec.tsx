import { AppState } from '@stores/app/app.types';
import { RootStore, RootStoreContext } from '@stores/root/root.store';
import { render } from '@testing-library/react';
import { FC } from 'react';
import { Counter } from './counter';

describe(`${Counter.name}`, () => {
    let rootStore: RootStore;
    let TestStoreProvider: FC;
    beforeEach(() => {
        const initial: AppState = {
            counter: {
                $count: 0
            }
        };
        rootStore = RootStore.make(initial);
        TestStoreProvider = function TestStoreProvider({ children }) {
            return (
                <RootStoreContext.Provider value={rootStore}>
                    {children}
                </RootStoreContext.Provider>
            );
        };
        TestStoreProvider.displayName = 'TestStoreProvider';
    });
    it('renders without errors', () => {
        expect(() =>
            render(
                <TestStoreProvider>
                    <Counter />
                </TestStoreProvider>
            )
        ).not.toThrow();
    });
});
