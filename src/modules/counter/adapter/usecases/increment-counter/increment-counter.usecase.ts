import { COUNTER_STORE } from '@stores/domain/counter/counter.tokens';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { container, inject, injectable, InjectionToken } from 'tsyringe';
import { EnterCounterUseCase } from '../enter-counter/enter-counter.usecase';

@injectable()
export class IncrementCounterUseCase implements UseCase {
    constructor(@inject(COUNTER_STORE) private store: CounterModel) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(value: number): void {
        this.store.increment(value);
    }
}

export const INCREMENT_COUNTER_USE_CASE: InjectionToken<EnterCounterUseCase> = Symbol(
    'INCREMENT_COUNTER_USE_CASE'
);

container.register(INCREMENT_COUNTER_USE_CASE, {
    useClass: IncrementCounterUseCase
});
