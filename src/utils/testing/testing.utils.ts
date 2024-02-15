import { act } from '@testing-library/react';
import { useCallback, useEffect, useRef } from 'react';

const DEFAULT_DELAY_MS = 0;

export const sleep = async (time = DEFAULT_DELAY_MS): Promise<void> => {
    const now = Date.now();
    while (Date.now() < now + time) {
        await new Promise((res) => process.nextTick(res));
    }
    return;
};

export const sleepTimeout = async (time = DEFAULT_DELAY_MS): Promise<void> => {
    await new Promise((res) => {
        setTimeout(res, time);
    });
};

export const tick = (): Promise<unknown> => act(() => Promise.resolve());

export const useRenderCounter = (): (() => number) => {
    const countRef = useRef(0);

    useEffect(() => {
        countRef.current += 1;
    });

    useEffect(() => {
        return (): void => {
            countRef.current = 0;
        };
    }, []);

    return useCallback(() => countRef.current, []);
};
