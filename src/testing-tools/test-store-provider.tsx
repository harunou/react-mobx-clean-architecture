import { AppState } from '@stores/app/app.types';
import { RootStore, RootStoreContext } from '@stores/root/root.store';
import { FC, useState } from 'react';

export interface TestStoreProviderProps {
    state: AppState;
}

export const TestStoreProvider: FC<TestStoreProviderProps> = ({
    state,
    children
}) => {
    const [rootStore] = useState(RootStore.make(state));
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
};
