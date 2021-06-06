import { UseCase } from '@stores/helpers/store/store.types';
import { action, makeObservable } from 'mobx';
import { GetCountEffect } from '../../effects/get-count/get-count.effect';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';

export class LeaveCounter implements UseCase {
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
