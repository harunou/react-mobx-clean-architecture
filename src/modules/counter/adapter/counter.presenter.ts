import { sliceCounterStore } from '@stores/root/root.helpers';
import { RootStore } from '@stores/root/root.store';
import { counterSelectors } from './selectors/counter.selectors';

export interface CounterPresenter {
    count$: number;
    selectMultiplyCount$: (factor: number) => number;
}

export const counterPresenter = (stores: {
    rootStore: RootStore;
}): CounterPresenter => {
    const counter = sliceCounterStore(stores.rootStore);

    return {
        get count$(): number {
            return counterSelectors.selectCount({ counter });
        },
        selectMultiplyCount$: (factor: number): number =>
            counterSelectors.selectMultiplyCount(factor, { counter })
    };
};
