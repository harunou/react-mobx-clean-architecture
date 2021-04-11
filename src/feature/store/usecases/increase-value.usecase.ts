import { action, makeObservable } from 'mobx';
import { CounterModel } from '../../../stores/counter/counter.types';
import { UseCaseInteractionBuilder } from '../../../stores/helpers/stores.helpers';
import { UseCase } from '../../../stores/stores.types';
import { AppUseCaseParams } from '../../../stores/app/app.types';

export class IncreaseValue implements UseCase {
    static make({ store, props }: AppUseCaseParams<number>): IncreaseValue {
        return new IncreaseValue(store.counter, props);
    }

    constructor(private store: CounterModel, private props: number = 0) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(): void {
        this.store.setCount(this.store.$count + this.props);
    }
}
export const IncreaseValueUseCase = UseCaseInteractionBuilder.make(
    IncreaseValue
);
