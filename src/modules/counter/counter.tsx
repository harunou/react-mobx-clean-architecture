import { noop } from '@core/core.helpers';
import { RootContainerContext } from '@core/root-container-provider';
import { useRegistry } from '@stores/helpers/store.helpers';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { container } from 'tsyringe';
import { CounterController } from './adapter/counter.controller';
import { CounterPresenter } from './adapter/counter.presenter';
import { counterRegistry } from './adapter/counter.registry';

export const counterTestIds = {
    add_1_button: 'add-1-button',
    add_1_andSaveOptimisticButton: 'add-1-and-save-optimistic-button',
    add_1_andSavePessimisticButton: 'add-1-and-save-pessimistic-button',
    selectCount: 'select-count',
    selectMultiplyCountOn_10: 'select-multiply-count-on-10'
};

export const Counter: FC = observer(() => {
    const { useAdapter } = useRegistry(counterRegistry, RootContainerContext);
    const counterController = useAdapter(CounterController);
    const counterPresenter = useAdapter(CounterPresenter);

    const {
        mounted,
        unmounted,
        add_1_ButtonPushed,
        add_1_andSaveOptimisticButtonPushed,
        add_1_andSavePessimisticButtonPushed
    } = counterController;
    const { selectCount, selectMultiplyCountOn_10 } = counterPresenter;

    useEffect(() => {
        mounted();
        return () => {
            unmounted();
            container.reset();
        };
    }, []);

    return (
        <div>
            <button
                data-testid={counterTestIds.add_1_button}
                onClick={add_1_ButtonPushed}
            >
                +1
            </button>
            <button
                data-testid={counterTestIds.add_1_andSaveOptimisticButton}
                onClick={add_1_andSaveOptimisticButtonPushed}
            >
                +1 and save optimistic
            </button>
            <button
                data-testid={counterTestIds.add_1_andSavePessimisticButton}
                onClick={add_1_andSavePessimisticButtonPushed}
            >
                +1 and save pessimistic
            </button>
            <span data-testid={counterTestIds.selectCount}>{selectCount}</span>
            <span data-testid={counterTestIds.selectMultiplyCountOn_10}>
                {selectMultiplyCountOn_10}
            </span>
            <button onClick={noop}>-1</button>
        </div>
    );
});

Counter.displayName = 'Counter';
