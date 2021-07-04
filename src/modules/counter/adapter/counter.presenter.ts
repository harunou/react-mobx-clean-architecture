import { RootStore } from '@stores/root/root.store';
import { sliceCounterStore } from '@stores/helpers/stores.helpers';
import {
    multiplyCountSelector,
    countSelector
} from './selectors/counter.selectors';
import { makeAutoObservable } from 'mobx';

export interface CounterPresenter {
    count$: number;
    selectMultiplyCount$: (factor: number) => number;
}

export const counterPresenter = (rootStore: RootStore): CounterPresenter => {
    const counter = sliceCounterStore(rootStore);

    return makeAutoObservable({
        get count$(): number {
            return countSelector({ counter });
        },
        selectMultiplyCount$: (factor: number): number =>
            multiplyCountSelector(factor, { counter })
    });
};
