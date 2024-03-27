import type { CancelEffect, CancelEffectCollection } from 'src/@types';

export interface OrdersCancelEffectCollection extends CancelEffectCollection {
    cancelByOrderId(orderId: string): void;
    addFetchOrders(effect: CancelEffect): void;
    removeFetchOrders(): void;
    cancelFetchOrders(): void;
}
