import { OnDestroy, OnInit } from '@stores/helpers/context/context.types';
import { RootStoreExecutor } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import { destroyCounterUseCase } from './usecases/destroy-counter/destroy-counter.usecase';
import { incrementCounterAndSaveOptimisticUseCase } from './usecases/increment-counter-and-save-optimistic/increment-counter-and-save-optimistic.usecase';
import { incrementValueAndSavePessimisticUseCase } from './usecases/increment-value-and-save-pessimistic/increment-value-and-save-pessimistic.usecase';
import { incrementCounterUseCase } from './usecases/increment-counter/increment-counter.usecase';
import { initCounterUseCase } from './usecases/init-counter/init-counter.usecase';

export class CounterController implements OnInit, OnDestroy {
    constructor(private readonly store: RootStoreExecutor) {
        makeObservable(this, {
            add_1_ButtonPushed: action.bound,
            add_1_andSaveOptimisticButtonPushed: action.bound,
            add_1_andSavePessimisticButtonPushed: action.bound
        });
    }
    onInit(): void {
        this.store.execute(initCounterUseCase);
    }
    onDestroy(): void {
        this.store.execute(destroyCounterUseCase);
    }
    add_1_ButtonPushed(): void {
        this.store.execute(incrementCounterUseCase.withProps(1));
    }
    add_1_andSaveOptimisticButtonPushed(): void {
        this.store.execute(
            incrementCounterAndSaveOptimisticUseCase.withProps(1)
        );
    }
    add_1_andSavePessimisticButtonPushed(): void {
        this.store.execute(
            incrementValueAndSavePessimisticUseCase.withProps(1)
        );
    }
}
