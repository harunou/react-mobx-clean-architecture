import { noop } from '@core/core.helpers';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

export const counterTestIds = {
    addOneButton: 'add-one-button',
    addOneAndSaveOptimisticButton: 'add-one-and-save-optimistic-button',
    addOneAndSavePessimisticButton: 'add-one-and-save-pessimistic-button',
    selectCount: 'select-count',
    selectMultiplyCountOnTen: 'select-multiply-count-on-ten'
};

export const Counter: FC = observer(() => {
    const [
        addOneButtonPushed,
        addOneAndSaveOptimisticButtonPushed,
        addOneAndSavePessimisticButtonPushed
    ] = [noop, noop, noop];

    const [selectCount, selectMultiplyCountOnTen] = [0, 0];

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
