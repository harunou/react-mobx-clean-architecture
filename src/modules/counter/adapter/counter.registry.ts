import { Registry } from '@stores/helpers/registry/registry';
import { Lifecycle } from 'tsyringe';
import { CounterController } from './counter.controller';
import { CounterPresenter } from './counter.presenter';
import { GetCountEffect } from './effects/get-count/get-count.effect';
import { IncrementCountEffect } from './effects/increment-count/increment-count.effect';
import { SaveCountEffect } from './effects/save-count/save-count.effect';
import { CountSelector } from './selectors/count/count.selector';
import { MultiplyCountSelector } from './selectors/multiply-count/multiply-count.selector';
import { EnterCounterUseCase } from './usecases/enter-counter/enter-counter.usecase';
import { IncrementCounterAndSaveOptimisticUseCase } from './usecases/increment-counter-and-save-optimistic/increment-counter-and-save-optimistic.usecase';
import { IncrementCounterAndSavePessimisticUseCase } from './usecases/increment-counter-and-save-pessimistic/increment-counter-and-save-pessimistic.usecase';
import { IncrementCounterUseCase } from './usecases/increment-counter/increment-counter.usecase';
import { LeaveCounterUseCase } from './usecases/leave-counter/leave-counter.usecase';

export const counterRegistry = Registry.make()
    .add({
        token: CounterController,
        useClass: CounterController,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: CounterPresenter,
        useClass: CounterPresenter,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: CountSelector,
        useClass: CountSelector,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: MultiplyCountSelector,
        useClass: MultiplyCountSelector,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: GetCountEffect,
        useClass: GetCountEffect,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: IncrementCountEffect,
        useClass: IncrementCountEffect,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: SaveCountEffect,
        useClass: SaveCountEffect,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: EnterCounterUseCase,
        useClass: EnterCounterUseCase,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: IncrementCounterUseCase,
        useClass: IncrementCounterUseCase,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: IncrementCounterAndSaveOptimisticUseCase,
        useClass: IncrementCounterAndSaveOptimisticUseCase,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: IncrementCounterAndSavePessimisticUseCase,
        useClass: IncrementCounterAndSavePessimisticUseCase,
        options: { lifecycle: Lifecycle.Singleton }
    })
    .add({
        token: LeaveCounterUseCase,
        useClass: LeaveCounterUseCase,
        options: { lifecycle: Lifecycle.Singleton }
    });
