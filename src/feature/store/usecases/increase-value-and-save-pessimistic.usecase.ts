import { action, makeObservable } from 'mobx';
import { CounterModel } from '../../../stores/counter/counter.types';
import { DomainModel } from '../../../stores/domain/domain.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/stores.types';
import { PersistenceModel } from '../../../stores/persistence/persistence.types';
import { AppUseCaseParams } from '../../../stores/app/app.types';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';

export class IncreaseValueAndSavePessimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: AppUseCaseParams<number>): IncreaseValueAndSavePessimistic {
        const effect = SaveCountSuccessEffect.make(persistence);
        return new IncreaseValueAndSavePessimistic(
            store.counter,
            effect,
            props
        );
    }

    constructor(
        private store: CounterModel,
        private flow: SaveCountSuccessEffect,
        private props: number = 0
    ) {
        makeObservable(this, {
            saveSuccess: action.bound
        });
    }

    execute(): void {
        this.flow.save(this.store.$count + this.props).then(this.saveSuccess);
    }

    saveSuccess(count: number): void {
        this.store.setCount(count);
    }
}
export const IncreaseValueAndSavePessimisticUseCase = UseCaseInteractionBuilder.make(
    IncreaseValueAndSavePessimistic
);
