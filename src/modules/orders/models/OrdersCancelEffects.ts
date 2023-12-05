import type { CancelEffect } from 'src/@types';
import { removeFromArray } from 'src/utils';
import type { AbstractOrdersCancelEffects } from '../types';

type OrderId = string;

export class OrdersCancelEffects implements AbstractOrdersCancelEffects {
    static make(): OrdersCancelEffects {
        return new OrdersCancelEffects();
    }
    private effectsByOrderId = new Map<OrderId, CancelEffect[]>();
    private fetchOrdersEffect: CancelEffect | undefined = undefined;

    add(orderId: string, effect: CancelEffect): void {
        if (!this.effectsByOrderId.has(orderId)) {
            this.effectsByOrderId.set(orderId, []);
        }
        this.effectsByOrderId.get(orderId)?.push(effect);
    }

    remove(orderId: string, effect: CancelEffect): void {
        const effects = this.effectsByOrderId.get(orderId);
        if (effects) {
            removeFromArray(effects, effect);
        }
    }

    cancelByOrderId(orderId: string): void {
        const effects = this.effectsByOrderId.get(orderId);

        if (effects) {
            effects.forEach((effect) => {
                effect.cancel();
            });
            this.effectsByOrderId.delete(orderId);
        }
    }

    addFetchOrders(effect: CancelEffect): void {
        this.fetchOrdersEffect = effect;
    }

    removeFetchOrders(): void {
        this.fetchOrdersEffect = undefined;
    }

    cancelFetchOrders(): void {
        if (this.fetchOrdersEffect) {
            this.fetchOrdersEffect.cancel();
            this.fetchOrdersEffect = undefined;
        }
    }
}
