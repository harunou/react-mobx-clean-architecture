import { action, makeObservable } from 'mobx';
import { DomainModel } from '../../stores/domainStore/domainStore.types';
import { StoreExecuter } from '../../stores/appStore/appStore.types';
import { IncreaseValueUseCase } from './usecases/feature.usecases';
import { PersistenceModel } from '../../stores/persistenceStore/persistenceStore.types';

export class FeatureController {
    static make(
        store: StoreExecuter<DomainModel, PersistenceModel>
    ): FeatureController {
        return new FeatureController(store);
    }
    constructor(private store: StoreExecuter<DomainModel, PersistenceModel>) {
        makeObservable(this, {
            add_1_ButtonPushed: action.bound
        });
    }
    add_1_ButtonPushed(): void {
        this.store.execute(IncreaseValueUseCase.withParams(1));
    }
}
