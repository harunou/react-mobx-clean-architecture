import { CounterModel } from '@stores/counter/counter.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
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

    async execute(): Promise<void> {
        await this.store.setCount(this.store.$count + this.props);
    }
}
export const increaseValueUseCase = UseCaseBuilder.make(IncreaseValue);
