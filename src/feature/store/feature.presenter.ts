import { computed, makeObservable } from 'mobx';
import { Domain } from '../../stores/domain/domain.types';
import { StoreQuery } from '../../stores/root/root.types';
import { MultiplySelector } from './selectors/multiply.selector';

export class FeaturePresenter {
    static make(store: StoreQuery<Domain>): FeaturePresenter {
        return new FeaturePresenter(store);
    }
    constructor(private store: StoreQuery<Domain>) {
        makeObservable(this, {
            selectMultiplyOn_10: computed
        });
    }
    get selectMultiplyOn_10(): number {
        return this.store.query(MultiplySelector.withParams(10)).result;
    }
}
