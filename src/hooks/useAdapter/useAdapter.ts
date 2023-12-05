import { useState } from 'react';

export function useAdapter<T>(fn: () => T): T {
    const [adapter] = useState(fn);
    return adapter;
}
