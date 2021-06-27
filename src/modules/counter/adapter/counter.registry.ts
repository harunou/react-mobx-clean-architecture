import { Registry } from '@stores/helpers/registry/registry';
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
    .addSelector(CountSelector)
    .addSelector(MultiplyCountSelector)
    .addUseCase(EnterCounterUseCase)
    .addUseCase(IncrementCounterUseCase)
    .addUseCase(IncrementCounterAndSaveOptimisticUseCase)
    .addUseCase(IncrementCounterAndSavePessimisticUseCase)
    .addUseCase(LeaveCounterUseCase)
    .addEffect(GetCountEffect)
    .addEffect(IncrementCountEffect)
    .addEffect(SaveCountEffect)
    .addAdapter(CounterController)
    .addAdapter(CounterPresenter);
