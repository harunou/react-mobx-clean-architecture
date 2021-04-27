import { noop } from '@core/core.helpers';
import { useAdapter } from '@stores/root/root.store';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { CounterController } from './adapter/counter.controller';
import { CounterPresenter } from './adapter/counter.presenter';

export const Counter: FC = observer(() => {
    const { controller, presenter } = useAdapter(
        CounterController,
        CounterPresenter
    );
    const {
        add_1_ButtonPushed,
        add_1_andSaveOptimisticButtonPushed,
        add_1_andSavePessimisticButtonPushed
    } = controller;
    const { selectCount, selectMultiplyCountOn_10 } = presenter;

    return (
        <div>
            <button onClick={add_1_ButtonPushed}>+1</button>
            <button onClick={add_1_andSaveOptimisticButtonPushed}>
                +1 and save optimistic
            </button>
            <button onClick={add_1_andSavePessimisticButtonPushed}>
                +1 and save pessimistic
            </button>
            <span>{selectCount}</span>
            <span>{selectMultiplyCountOn_10}</span>
            <button onClick={noop}>-1</button>
        </div>
    );
});
