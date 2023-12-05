import type { CancelEffect } from 'src/@types';

export const makeCancelEffect = (
    abortController: AbortController | undefined = undefined,
): { abortController: AbortController; cancelEffect: CancelEffect } => {
    if (!abortController) {
        abortController = new AbortController();
    }
    const cancelEffect: CancelEffect = {
        cancel: () => abortController?.abort(),
    };
    return {
        abortController,
        cancelEffect,
    };
};
