import { RootStore } from '@stores/root/root.store';
import { sliceCounterStore } from '@stores/helpers/stores.helpers';
import { counterSelectors } from './selectors/counter.selectors';

export interface CounterPresenter {
    count$: number;
    selectMultiplyCount$: (factor: number) => number;
}

export const counterPresenter = (rootStore: RootStore): CounterPresenter => {
    const counter = sliceCounterStore(rootStore);

    return {
        get count$(): number {
            return counterSelectors.selectCount({ counter });
        },
        selectMultiplyCount$: (factor: number): number =>
            counterSelectors.selectMultiplyCount(factor, { counter })
    };
};
