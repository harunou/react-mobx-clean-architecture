import { noop } from '@core/core.helpers';
import { RootStore } from '@stores/root/root.store';
import {
    useMountedHook,
    useStore,
    useUnMountedHook
} from '@stores/helpers/stores.helpers';
import { observer } from 'mobx-react-lite';
import { createContext, FC } from 'react';
import { counterController } from './adapter/counter.controller';
import { counterPresenter } from './adapter/counter.presenter';

export const counterTestIds = {
    addOneButton: 'add-one-button',
    addOneAndSaveOptimisticButton: 'add-one-and-save-optimistic-button',
    addOneAndSavePessimisticButton: 'add-one-and-save-pessimistic-button',
    selectCount: 'select-count',
    selectMultiplyTenTimesCount: 'select-multiply-ten-times-count'
};

export const RootStoreContext = createContext({} as RootStore);

export const Counter: FC = observer(() => {
    const { useAdapter, store } = useStore(RootStoreContext);

    noop(store);

    const controller = useAdapter(counterController);
    const presenter = useAdapter(counterPresenter);

    const {
        addOneButtonPushed,
        addOneAndSaveOptimisticButtonPushed,
        addOneAndSavePessimisticButtonPushed,
        mounted,
        unmounted
    } = controller;
    const { selectCount$, selectMultiplyTenTimesCount$ } = presenter;

    useMountedHook(() => mounted());
    useUnMountedHook(() => unmounted());

    return (
        <div>
            <button
                data-testid={counterTestIds.addOneButton}
                onClick={addOneButtonPushed}
            >
                +1
            </button>
            <button
                data-testid={counterTestIds.addOneAndSaveOptimisticButton}
                onClick={addOneAndSaveOptimisticButtonPushed}
            >
                +1 and save optimistic
            </button>
            <button
                data-testid={counterTestIds.addOneAndSavePessimisticButton}
                onClick={addOneAndSavePessimisticButtonPushed}
            >
                +1 and save pessimistic
            </button>
            <span data-testid={counterTestIds.selectCount}>{selectCount$}</span>
            <span data-testid={counterTestIds.selectMultiplyTenTimesCount}>
                {selectMultiplyTenTimesCount$}
            </span>
            <button onClick={noop}>-1</button>
        </div>
    );
});
