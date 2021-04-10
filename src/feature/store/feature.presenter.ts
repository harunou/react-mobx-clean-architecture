import { computed, makeObservable } from 'mobx';
import { DomainModel } from '../../stores/domainStore/domainStore.types';
import { StoreQuery } from '../../stores/appStore/appStore.types';
import { MultiplySelector } from './selectors/multiply.selector';

export class FeaturePresenter {
    static make(store: StoreQuery<DomainModel>): FeaturePresenter {
        return new FeaturePresenter(store);
    }
    constructor(private store: StoreQuery<DomainModel>) {
        makeObservable(this, {
            multiplyOn_10: computed
        });
    }
    get multiplyOn_10(): number {
        return this.store.query(MultiplySelector.withParams(10)).result;
    }
}
