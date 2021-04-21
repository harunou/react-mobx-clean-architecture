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
    const { add_1_ButtonPushed } = controller;
    const { selectCount } = presenter;

    return (
        <div>
            <button onClick={add_1_ButtonPushed}>+</button>
            <span>{selectCount}</span>
            <button onClick={noop}>-</button>
        </div>
    );
});
