import type { UseCase } from 'src/@types';
import type { AbstractOrdersCancelEffects, AbstractOrdersStore } from '../../types';

type AbstractOrdersCancelEffectsDep = Pick<AbstractOrdersCancelEffects, 'cancelFetchOrders'>;

export class DestroyModuleUseCase implements UseCase {
    static make(ordersStore: AbstractOrdersStore): UseCase {
        return new DestroyModuleUseCase(ordersStore.ordersCancelEffects);
    }

    constructor(private ordersCancelEffects: AbstractOrdersCancelEffectsDep) {}

    async execute(): Promise<void> {
        return Promise.resolve(this.ordersCancelEffects.cancelFetchOrders());
    }
}
