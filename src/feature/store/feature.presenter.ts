import { computed, makeObservable } from 'mobx';
import { Domain } from '../../stores/domain/domain.types';
import { StoreQuery } from '../../stores/root/root.types';
import { MultiplyCountSelector } from './selectors/multiply-count.selector';

export class FeaturePresenter {
    static make(store: StoreQuery<Domain>): FeaturePresenter {
        return new FeaturePresenter(store);
    }
    constructor(private store: StoreQuery<Domain>) {
        makeObservable(this, {
            selectMultiplyCountOn_10: computed
        });
    }
    get selectMultiplyCountOn_10(): number {
        return this.store.query(MultiplyCountSelector.withParams(10)).result;
    }
}
