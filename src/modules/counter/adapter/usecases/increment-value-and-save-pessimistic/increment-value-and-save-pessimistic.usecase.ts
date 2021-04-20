import { CounterModel } from '@stores/counter/counter.types';
import { Effect } from '@stores/helpers/effect/effect.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import incrementCountEffect, {
    IncrementCountExecuteProps
} from '../../effects/increment-count/increment-count.effect';

export class IncrementValueAndSavePessimistic implements UseCase {
    static make({
        store,
        persistence,
        props
    }: RootUseCaseMakeParams<number>): IncrementValueAndSavePessimistic {
        const effect = incrementCountEffect.build(store, persistence);
        return new IncrementValueAndSavePessimistic(
            store.counter,
            effect,
            props
        );
    }

    constructor(
        private store: CounterModel,
        private effect: Effect<IncrementCountExecuteProps, Promise<number>>,
        private props: number = 0
    ) {
        makeObservable(this, {
            saveSuccess: action.bound
        });
    }

    execute(): void {
        this.effect
            .execute({ increment: this.props, count: this.store.$count })
            .then(this.saveSuccess);
    }

    saveSuccess(count: number): void {
        this.store.setCount(count);
    }
}
const incrementValueAndSavePessimisticUseCase = UseCaseBuilder.make(
    IncrementValueAndSavePessimistic
);
export default incrementValueAndSavePessimisticUseCase;
