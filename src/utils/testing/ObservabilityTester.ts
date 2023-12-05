import { autorun } from 'mobx';
import { noop } from '../noop';

export class ObservabilityTester<T> {
    static make<R>(): ObservabilityTester<R> {
        return new ObservabilityTester();
    }
    private disposer: () => void = noop;
    private _result: T[] = [];
    get result(): T[] {
        return this._result;
    }
    watch(fn: () => T): void {
        this.disposer = autorun(() => this._result.push(fn()));
    }
    dispose(): void {
        this._result = [];
        this.disposer();
    }
}
