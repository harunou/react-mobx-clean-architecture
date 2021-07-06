export type Action<T = unknown> = unknown extends T
    ? () => void
    : (payload: T) => void;

export type UseStoreHook<T> = { store: T; useAdapter: UseAdapterHook<T> };

export type UseAdapterHook<T> = <R = unknown>(
    adapterFunction: (store: T) => R
) => R;
