import { useLocalObservable } from 'mobx-react-lite';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- NOTE(harunou): any is needed here to describe correct type
export function useLocalAdapter<TStore extends Record<string, any>>(
    initializer: () => TStore,
): TStore {
    return useLocalObservable(initializer);
}
