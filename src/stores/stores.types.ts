export type Action = () => void;

export type UseStoreHook<T> = { store: T; useAdapter: UseAdapterHook<T> };

export type UseAdapterHook<T> = <R = unknown>(
    adapterFunction: (store: T) => R
) => R;
