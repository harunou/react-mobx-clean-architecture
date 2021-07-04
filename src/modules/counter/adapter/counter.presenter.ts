import { RootStore } from '@stores/root/root.store';
import { sliceCounterStore } from '@stores/helpers/stores.helpers';
import {
    multiplyCountSelector,
    countSelector
} from './selectors/counter.selectors';

export interface CounterPresenter {
    selectCount$: number;
    selectMultiplyTenTimesCount$: number;
}

export const counterPresenter = (rootStore: RootStore): CounterPresenter => {
    const counter = sliceCounterStore(rootStore);

    return {
        selectCount$: countSelector({ counter }),
        selectMultiplyTenTimesCount$: multiplyCountSelector(10, { counter })
    };
};
