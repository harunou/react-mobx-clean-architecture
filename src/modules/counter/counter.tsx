import { noop } from '@core/core.helpers';
import {
    useAdapter,
    useMountedHook,
    useStore,
    useUnMountedHook
} from '@stores/helpers/stores.helpers';
import { useContextRootStore } from '@stores/root/root.helpers';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { counterController } from './adapter/counter.controller';
import { counterPresenter } from './adapter/counter.presenter';
import { ModuleStore } from './stores/module.store';

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
        addAnyButtonPushed,
        addOneButtonPushed,
        addOneAndSaveOptimisticButtonPushed,
        addOneAndSavePessimisticButtonPushed,
        mounted,
        unmounted
    } = controller;
    const { count$, selectMultiplyCount$ } = presenter;

    noop(addAnyButtonPushed);

    useMountedHook(mounted);
    useUnMountedHook(unmounted);

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
            <span data-testid={counterTestIds.selectCount}>{count$}</span>
            <span data-testid={counterTestIds.selectMultiplyTenTimesCount}>
                {selectMultiplyCount$(multiplyFactor)}
            </span>
            <button onClick={noop}>-1</button>
        </div>
    );
});
