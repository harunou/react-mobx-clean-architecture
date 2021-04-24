import { AppState } from '@stores/app/app.types';
import { render } from '@testing-library/react';
import { TestStoreProvider } from '@testing-tools/test-store-provider';
import { Counter } from './counter';

describe(`${Counter.name}`, () => {
    const initial: AppState = {
        counter: {
            $count: 0
        }
    };

    it('renders without errors', () => {
        expect(() =>
            render(
                <TestStoreProvider state={initial}>
                    <Counter />
                </TestStoreProvider>
            )
        ).not.toThrow();
    });
});
