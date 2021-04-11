import { computed, makeObservable } from 'mobx';
import { AppStoreQuery } from '../../stores/app/app.types';
import { MultiplyCountSelector } from './selectors/multiply-count.selector';

export class FeaturePresenter {
    static make(store: AppStoreQuery): FeaturePresenter {
        return new FeaturePresenter(store);
    }
    constructor(private store: AppStoreQuery) {
        makeObservable(this, {
            selectMultiplyCountOn_10: computed
        });
    }
    get selectMultiplyCountOn_10(): number {
        return this.store.query(MultiplyCountSelector.withProps(10)).result;
    }
}
