import type { CancelEffect, CancelEffects } from 'src/@types';

export interface AbstractOrdersCancelEffects extends CancelEffects {
    cancelByOrderId(orderId: string): void;
    addFetchOrders(effect: CancelEffect): void;
    removeFetchOrders(): void;
    cancelFetchOrders(): void;
}
