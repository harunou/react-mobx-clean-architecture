import { action, makeObservable } from 'mobx';
import { DomainModel } from '../../stores/domainStore/domainStore.types';
import { StoreExecuter } from '../../stores/rootStore/rootStore.types';
import { IncreaseValueUseCase } from '../usecases/feature.usecases';

export class FeatureController {
    make(store: StoreExecuter<DomainModel>): FeatureController {
        return new FeatureController(store);
    }
    constructor(private store: StoreExecuter<DomainModel>) {
        makeObservable(this, {
            add_1_ButtonPushed: action.bound
        });
    }
    add_1_ButtonPushed(): void {
        this.store.execute(IncreaseValueUseCase.withParams(1));
    }
}
