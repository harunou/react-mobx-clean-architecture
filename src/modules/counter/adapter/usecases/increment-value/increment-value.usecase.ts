import { CounterModel } from '@stores/counter/counter.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';

export class IncrementValue implements UseCase {
    static make({
        store,
        props
    }: RootUseCaseMakeParams<number>): IncrementValue {
        return new IncrementValue(store.counter, props);
    }

    constructor(private store: CounterModel, private props: number = 0) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(): void {
        this.store.increment(this.props);
    }
}

const incrementValueUseCase = UseCaseBuilder.make(IncrementValue);

export default incrementValueUseCase;
