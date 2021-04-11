import { computed, makeObservable } from 'mobx';
import { DomainState } from '../../stores/domain/domain.types';
import { StoreQuery } from '../../stores/helpers/stores.types';
import { MultiplyCountSelector } from './selectors/multiply-count.selector';

export class FeaturePresenter {
    static make(store: StoreQuery<DomainState>): FeaturePresenter {
        return new FeaturePresenter(store);
    }
    constructor(private store: StoreQuery<DomainState>) {
        makeObservable(this, {
            selectMultiplyCountOn_10: computed
        });
    }
    get selectMultiplyCountOn_10(): number {
        return this.store.query(MultiplyCountSelector.withParams(10)).result;
    }
}
