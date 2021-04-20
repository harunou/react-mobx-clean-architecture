import { AppState } from '@stores/app/app.types';
import {
    RootStore,
    RootStoreContext,
    useAdapter
} from '@stores/root/root.store';
import { noop } from '@testing-tools';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CounterController } from './adapter/counter.controller';
import { CounterPresenter } from './adapter/counter.presenter';

const initial: AppState = {
    counter: {
        $count: 0
    }
};

const rootStore = RootStore.make(initial);

const Counter: FC = () => {
    const { controller, presenter } = useAdapter(
        CounterController,
        CounterPresenter
    );
    const { add_1_ButtonPushed } = controller;
    const { selectCount } = presenter;

    return (
        <RootStoreContext.Provider value={rootStore}>
            <div>
                <button onClick={add_1_ButtonPushed}>+</button>
                <span>{selectCount}</span>
                <button onClick={noop}>-</button>
            </div>
        </RootStoreContext.Provider>
    );
};

export default observer(Counter);
