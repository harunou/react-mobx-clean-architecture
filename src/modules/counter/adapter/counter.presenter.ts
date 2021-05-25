import { computed, makeObservable } from 'mobx';
import { CountSelector } from './selectors/count/count.selector';
import { MultiplyCountSelector } from './selectors/multiply-count/multiply-count.selector';

export class CounterPresenter {
    constructor(
        private countSelector: CountSelector,
        private multiplyCountSelector: MultiplyCountSelector
    ) {
        makeObservable(this, {
            selectMultiplyCountOn_10: computed,
            selectCount: computed
        });
    }
    get selectMultiplyCountOn_10(): number {
        return this.multiplyCountSelector.withProps(10).result;
    }

    get selectCount(): number {
        return this.countSelector.result;
    }
}
