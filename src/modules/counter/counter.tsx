import { noop } from '@core/core.helpers';
import { makeContainerProvider } from '@stores/helpers/store.helpers';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { CounterController } from './adapter/counter.controller';
import { CounterPresenter } from './adapter/counter.presenter';
import { counterRegistry } from './adapter/counter.registry';

export const counterTestIds = {
    addOneButton: 'add-one-button',
    addOneAndSaveOptimisticButton: 'add-one-and-save-optimistic-button',
    addOneAndSavePessimisticButton: 'add-one-and-save-pessimistic-button',
    selectCount: 'select-count',
    selectMultiplyCountOnTen: 'select-multiply-count-on-ten'
};

export const [
    RootContainerProvider,
    useRootContainer
] = makeContainerProvider();

export const Counter: FC = observer(() => {
    const { useRegistry, container: rootContainer } = useRootContainer();
    const { useAdapter, container: counterContainer } = useRegistry(
        counterRegistry
    );
    const counterController = useAdapter(CounterController);
    const counterPresenter = useAdapter(CounterPresenter);

    noop(rootContainer, counterContainer);

    const {
        addOneButtonPushed,
        addOneAndSaveOptimisticButtonPushed,
        addOneAndSavePessimisticButtonPushed
    } = counterController;

    const { selectCount, selectMultiplyCountOnTen } = counterPresenter;

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
            <span data-testid={counterTestIds.selectCount}>{selectCount}</span>
            <span data-testid={counterTestIds.selectMultiplyCountOnTen}>
                {selectMultiplyCountOnTen}
            </span>
            <button onClick={noop}>-1</button>
        </div>
    );
});

Counter.displayName = 'Counter';
