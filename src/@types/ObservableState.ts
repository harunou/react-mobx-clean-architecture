export interface ObservableState<T> {
    value: T;
    setValue(v: T): void;
}
