import { render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { RootStoreContext } from 'src/contexts';
import { RootStore } from 'src/stores';
import { tick } from 'src/utils/testing';
import { App } from './App';

describe(`${App.name}`, () => {
    it('renders app container', async () => {
        const rootStore = RootStore.make();
        render(
            <StrictMode>
                <RootStoreContext.Provider value={rootStore}>
                    <App />
                </RootStoreContext.Provider>
            </StrictMode>,
        );

        await tick();

        const element = screen.getByText(/mobx-react-clean-architecture/i);
        expect(element).toBeInTheDocument();
    });
});
