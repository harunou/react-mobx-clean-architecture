import { RootStore } from '@stores/root/root.store';
import { sliceCounterStore } from '@stores/helpers/stores.helpers';
import {
    selectMultiplyCount$,
    selectCount$
} from './selectors/counter.selectors';

export interface CounterPresenter {
    count$: number;
    multiplyTenTimesCount$: number;
}

export const multiplyFactor = 10;

export const counterPresenter = (rootStore: RootStore): CounterPresenter => {
    const counter = sliceCounterStore(rootStore);

    return {
        get count$(): number {
            return selectCount$({ counter });
        },
        get multiplyTenTimesCount$(): number {
            return selectMultiplyCount$(multiplyFactor, {
                counter
            });
        }
    };
};
