import type { UseCase } from 'src/@types';
import type { AbstractOrdersCancelEffects, OrdersAggregate } from '../../types';

type AbstractOrdersCancelEffectsDep = Pick<AbstractOrdersCancelEffects, 'cancelFetchOrders'>;

export class DestroyModuleUseCase implements UseCase {
    static make(ordersStore: OrdersAggregate): UseCase {
        return new DestroyModuleUseCase(ordersStore.ordersCancelEffects);
    }

    constructor(private ordersCancelEffects: AbstractOrdersCancelEffectsDep) {}

    async execute(): Promise<void> {
        return Promise.resolve(this.ordersCancelEffects.cancelFetchOrders());
    }
}
