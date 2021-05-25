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
    return null;
    // const { controller, presenter } = useAdapter(
    //     CounterController,
    //     CounterPresenter
    // );
    // const {
    //     add_1_ButtonPushed,
    //     add_1_andSaveOptimisticButtonPushed,
    //     add_1_andSavePessimisticButtonPushed
    // } = controller;
    // const { selectCount, selectMultiplyCountOn_10 } = presenter;

    // return (
    //     <div>
    //         <button
    //             data-testid={counterTestIds.add_1_button}
    //             onClick={add_1_ButtonPushed}
    //         >
    //             +1
    //         </button>
    //         <button
    //             data-testid={counterTestIds.add_1_andSaveOptimisticButton}
    //             onClick={add_1_andSaveOptimisticButtonPushed}
    //         >
    //             +1 and save optimistic
    //         </button>
    //         <button
    //             data-testid={counterTestIds.add_1_andSavePessimisticButton}
    //             onClick={add_1_andSavePessimisticButtonPushed}
    //         >
    //             +1 and save pessimistic
    //         </button>
    //         <span data-testid={counterTestIds.selectCount}>{selectCount}</span>
    //         <span data-testid={counterTestIds.selectMultiplyCountOn_10}>
    //             {selectMultiplyCountOn_10}
    //         </span>
    //         <button onClick={noop}>-1</button>
    //     </div>
    // );
});
