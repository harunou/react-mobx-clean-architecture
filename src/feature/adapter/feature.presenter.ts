import { RootStoreQuery } from '@stores/root/root.types';
import { computed, makeObservable } from 'mobx';
import { multiplyCountSelector } from './selectors/multiply-count.selector';

export class FeaturePresenter {
    static make(store: RootStoreQuery): FeaturePresenter {
        return new FeaturePresenter(store);
    }
    constructor(private readonly store: RootStoreQuery) {
        makeObservable(this, {
            selectMultiplyCountOn_10: computed
        });
    }
    get selectMultiplyCountOn_10(): number {
        return this.store.query(multiplyCountSelector.withProps(10)).result;
    }
}
