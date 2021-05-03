import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import {
    GetCount,
    getCountEffect
} from '../../effects/get-count/get-count.effect';
import {
    IncrementCount,
    incrementCountEffect
} from '../../effects/increment-count/increment-count.effect';

export class DestroyCounter implements UseCase {
    static make({ store, persistence }: RootUseCaseMakeParams): DestroyCounter {
        const getCount = getCountEffect.build(store, persistence);
        const incrementCount = incrementCountEffect.build(store, persistence);
        return new DestroyCounter(getCount, incrementCount);
    }

    constructor(
        private getCountEffect: GetCount,
        private incrementCountEffect: IncrementCount
    ) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(): void {
        this.getCountEffect.cancel();
        this.incrementCountEffect.cancel();
    }
}

export const destroyCounterUseCase = UseCaseBuilder.make(DestroyCounter);
