import { CounterModel } from '@stores/counter/counter.types';
import { UseCaseInteractionBuilder } from '@stores/helpers/usecase/usecase.helper';
import { UseCase } from '@stores/helpers/usecase/usecase.types';
import { RootUseCaseParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';

export class IncreaseValue implements UseCase {
    static make({ store, props }: RootUseCaseParams<number>): IncreaseValue {
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
