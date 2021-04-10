import { action, makeObservable } from 'mobx';
import { Domain } from '../../../stores/domainStore/domainStore.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/helpers/stores.types';
import { Persistence } from '../../../stores/persistenceStore/persistenceStore.types';

export class IncreaseValue implements UseCase {
    static make(store: Domain, _: Persistence, params: number): IncreaseValue {
        return new IncreaseValue(store, params);
    }

    constructor(private store: Domain, private params: number) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(): void {
        this.store.setCount(this.store.$count + this.params);
    }
}
export const IncreaseValueUseCase = UseCaseInteractionBuilder.make(
    IncreaseValue
);
