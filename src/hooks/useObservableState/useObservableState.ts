import { action, computed, makeObservable, observable } from 'mobx';
import { useEffect } from 'react';
import type { ObservableState } from 'src/@types';
import { useAdapter } from '../useAdapter';

class HookObservableState<T> implements ObservableState<T> {
    @observable
    private _value: T;

    @computed
    get value(): T {
        return this._value;
    }

    constructor(initialValue: T) {
        makeObservable(this);
        this._value = initialValue;
    }

    @action.bound
    setValue(value: T): void {
        this._value = value;
    }
}

export function useObservableState<T>(value: T, deps: unknown[] = []): ObservableState<T> {
    const store = useAdapter(() => new HookObservableState(value));
    useEffect(() => {
        store.setValue(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, store]);
    return store;
}
