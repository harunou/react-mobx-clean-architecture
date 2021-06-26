import { UseCase } from '@stores/helpers/store.types';
import { action, makeObservable } from 'mobx';
import { injectable } from 'tsyringe';
import { GetCountEffect } from '../../effects/get-count/get-count.effect';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';

@injectable()
export class LeaveCounterUseCase implements UseCase {
    constructor(
        private getCountEffect: GetCountEffect,
        private incrementCountEffect: IncrementCountEffect
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
