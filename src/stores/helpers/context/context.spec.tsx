import { renderHook } from '@testing-library/react-hooks';
import assert from 'assert';
import { Context, createContext, FC } from 'react';
import { makeStoreUseAdapter } from './context.helpers';
import { AdapterConstructor, OnDestroy, OnInit } from './context.types';

interface Store {
    count: number;
}

class Controller implements OnInit, OnDestroy {
    private c = 'controller';
    constructor(public store: Store) {}
    onInit = jest.fn();
    onDestroy = jest.fn();
}
class Presenter {
    private p = 'presenter';
    constructor(public store: Store) {}
}

describe(`useAdapter hook`, () => {
    let store: Store;
    let Context: Context<Store | undefined>;
    let useAdapter: <C, P>(
        ControllerConstructor: AdapterConstructor<Store, C>,
        PresenterConstructor: AdapterConstructor<Store, P>
    ) => { controller: C; presenter: P };
    let ContextProvider: FC;
    beforeEach(() => {
        store = {
            count: 5
        };
        Context = createContext<Store | undefined>(undefined);
        useAdapter = makeStoreUseAdapter(Context);
        ContextProvider = function ContextProvider({ children }) {
            return (
                <Context.Provider value={store}>{children}</Context.Provider>
            );
        };
    });

    it('creates instances of controller and presenter', () => {
        const { result } = renderHook(() => useAdapter(Controller, Presenter), {
            wrapper: ContextProvider
        });

        expect(result.current.controller).toBeInstanceOf(Controller);
        expect(result.current.presenter).toBeInstanceOf(Presenter);
    });

    it('returns same instance of controller and presenter every render', () => {
        const { result, rerender } = renderHook(
            () => useAdapter(Controller, Presenter),
            {
                wrapper: ContextProvider
            }
        );

        rerender();

        const [first, second] = result.all;

        assert(!(first instanceof Error));
        assert(!(second instanceof Error));

        expect(first.controller).toBe(second.controller);
        expect(first.presenter).toBe(second.presenter);
    });

    it('calls onInit hook once', () => {
        const { result, rerender, unmount } = renderHook(
            () => useAdapter(Controller, Presenter),
            {
                wrapper: ContextProvider
            }
        );

        rerender();
        unmount();

        expect(result.current.controller.onInit).toBeCalledTimes(1);
    });

    it('calls onDestroy hook once', () => {
        const { result, rerender, unmount } = renderHook(
            () => useAdapter(Controller, Presenter),
            {
                wrapper: ContextProvider
            }
        );

        rerender();
        unmount();

        expect(result.current.controller.onDestroy).toBeCalledTimes(1);
    });
});
