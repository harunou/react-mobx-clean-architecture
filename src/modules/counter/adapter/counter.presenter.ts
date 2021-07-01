import { RootStore } from '@stores/root/root.store';
import { sliceCounterStore } from '@stores/stores.helpers';
import {
    multiplyCountSelector,
    countSelector
} from './selectors/counter.selectors';

export interface CounterPresenter {
    count$: number;
    multiplyTenTimesCount$: number;
}

export const counterPresenter = (rootStore: RootStore): CounterPresenter => {
    const counter = sliceCounterStore(rootStore);

    return {
        count$: countSelector({ counter }),
        multiplyTenTimesCount$: multiplyCountSelector(10, { counter })
    };
};
