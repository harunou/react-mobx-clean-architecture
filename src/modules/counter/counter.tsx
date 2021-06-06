import { noop } from '@core/core.helpers';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

export const counterTestIds = {
    add_1_button: 'add-1-button',
    add_1_andSaveOptimisticButton: 'add-1-and-save-optimistic-button',
    add_1_andSavePessimisticButton: 'add-1-and-save-pessimistic-button',
    selectCount: 'select-count',
    selectMultiplyCountOn_10: 'select-multiply-count-on-10'
};

export const Counter: FC = observer(() => {
    const add_1_ButtonPushed = noop;
    const add_1_andSaveOptimisticButtonPushed = noop;
    const add_1_andSavePessimisticButtonPushed = noop;
    const { selectCount, selectMultiplyCountOn_10 } = {
        selectCount: 0,
        selectMultiplyCountOn_10: 0
    };

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
