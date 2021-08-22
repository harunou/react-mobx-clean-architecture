import { noop } from '@core/core.helpers';
import {
    useAdapter,
    useMountedHook,
    useStore,
    useUnMountedHook
} from '@stores/helpers/stores.helpers';
import { useContextRootStore } from '@stores/root/root-store.helpers';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { counterController } from './adapter/counter.controller';
import { counterPresenter } from './adapter/counter.presenter';
import { ModuleStore } from './stores/module-store';

export const counterTestIds = {
    addOneButton: 'add-one-button',
    addOneAndSaveOptimisticButton: 'add-one-and-save-optimistic-button',
    addOneAndSavePessimisticButton: 'add-one-and-save-pessimistic-button',
    selectCount: 'select-count',
    selectMultiplyTenTimesCount: 'select-multiply-ten-times-count'
};

export const multiplyFactor = 10;

export const Counter: FC = observer(() => {
    const rootStore = useContextRootStore();
    const moduleStore = useStore(() => ModuleStore.make());

    const controller = useAdapter(() =>
        counterController({ rootStore, moduleStore: moduleStore })
    );
    const presenter = useAdapter(() => counterPresenter({ rootStore }));

    const {
        addValueToCounter,
        addOneToCounter,
        addOneToCounterAndSaveOptimistic,
        addOneAndSavePessimistic,
        loadDataAndInitializeStores: loadCountAndInitializeCounter,
        cancelAllPendingPromises
    } = controller;
    const { count$, selectMultiplyCount$ } = presenter;

    noop(addValueToCounter);

    useMountedHook(loadCountAndInitializeCounter);
    useUnMountedHook(cancelAllPendingPromises);

    return (
        <div>
            <button
                data-testid={counterTestIds.addOneButton}
                onClick={addOneToCounter}
            >
                +1
            </button>
            <button
                data-testid={counterTestIds.addOneAndSaveOptimisticButton}
                onClick={addOneToCounterAndSaveOptimistic}
            >
                +1 and save optimistic
            </button>
            <button
                data-testid={counterTestIds.addOneAndSavePessimisticButton}
                onClick={addOneAndSavePessimistic}
            >
                +1 and save pessimistic
            </button>
            <span data-testid={counterTestIds.selectCount}>{count$}</span>
            <span data-testid={counterTestIds.selectMultiplyTenTimesCount}>
                {selectMultiplyCount$(multiplyFactor)}
            </span>
            <button onClick={noop}>-1</button>
        </div>
    );
});
