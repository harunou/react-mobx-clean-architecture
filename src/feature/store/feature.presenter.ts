import { computed, makeObservable } from 'mobx';
import { RootStoreQuery } from '../../stores/root/root.types';
import { MultiplyCountSelector } from './selectors/multiply-count.selector';

export class FeaturePresenter {
    static make(store: RootStoreQuery): FeaturePresenter {
        return new FeaturePresenter(store);
    }
    constructor(private store: RootStoreQuery) {
        makeObservable(this, {
            selectMultiplyCountOn_10: computed
        });
    }
    get selectMultiplyCountOn_10(): number {
        return this.store.query(MultiplyCountSelector.withParams(10)).result;
    }
}
