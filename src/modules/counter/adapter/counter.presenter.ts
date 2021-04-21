import { RootStoreQuery } from '@stores/root/root.types';
import { computed, makeObservable } from 'mobx';
import { countSelector } from './selectors/count/count.selector';
import { multiplyCountSelector } from './selectors/multiply-count/multiply-count.selector';

export class CounterPresenter {
    constructor(private readonly store: RootStoreQuery) {
        makeObservable(this, {
            selectMultiplyCountOn_10: computed
        });
    }
    get selectMultiplyCountOn_10(): number {
        return this.store.query(multiplyCountSelector.withProps(10)).result;
    }

    get selectCount(): number {
        return this.store.query(countSelector).result;
    }
}
