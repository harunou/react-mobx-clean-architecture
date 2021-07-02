export type Action = () => void;

export type UseAdapterHook<T> = <R = unknown>(
    adapterFunction: (store: T) => R
) => R;
