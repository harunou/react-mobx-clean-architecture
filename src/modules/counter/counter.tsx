import { AppState } from '@stores/app/app.types';
import { RootStore } from '@stores/root/root.store';
import { noop } from '@testing-tools';
import { createContext, FC, useContext } from 'react';
import { CounterController } from './adapter/counter.controller';
import { CounterPresenter } from './adapter/counter.presenter';
import { observer } from 'mobx-react-lite';

const initial: AppState = {
    counter: {
        $count: 0
    }
};

const rootStore = RootStore.make(initial);

export const RootStoreContext = createContext<RootStore>(rootStore);

const Counter: FC = () => {
    const store = useContext(RootStoreContext);
    const controller = new CounterController(store);
    const presenter = new CounterPresenter(store);

    const { add_1_ButtonPushed } = controller;
    const { selectCount } = presenter;

    return (
        <div>
            <button onClick={add_1_ButtonPushed}>+</button>
            <span>{selectCount}</span>
            <button onClick={noop}>-</button>
        </div>
    );
};

export default observer(Counter);
