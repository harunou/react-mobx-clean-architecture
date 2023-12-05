import { act } from '@testing-library/react';

export const sleep = (ms = 0): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const tick = (): ReturnType<typeof act> => act(() => Promise.resolve());
