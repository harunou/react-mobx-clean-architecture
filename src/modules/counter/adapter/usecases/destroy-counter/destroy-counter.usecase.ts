import { UseCase } from '@stores/helpers/store/store.types';
import { UseCaseBuilder } from '@stores/helpers/usecase/usecase.helpers';
import { RootUseCaseMakeParams } from '@stores/root/root.types';
import { action, makeObservable } from 'mobx';
import {
    GetCount,
    getCountEffect
} from '../../effects/get-count/get-count.effect';

export class DestroyCounter implements UseCase {
    static make({ store, persistence }: RootUseCaseMakeParams): DestroyCounter {
        const effect = getCountEffect.build(store, persistence);
        return new DestroyCounter(effect);
    }

    constructor(private getCountEffect: GetCount) {
        makeObservable(this, {
            execute: action.bound
        });
    }

    execute(): void {
        this.getCountEffect.cancel();
    }
}

export const destroyCounterUseCase = UseCaseBuilder.make(DestroyCounter);
