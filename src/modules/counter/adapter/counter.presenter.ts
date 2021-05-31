import { computed, makeObservable } from 'mobx';
import { inject, injectable } from 'tsyringe';
import {
    CountSelector,
    COUNT_SELECTOR
} from './selectors/count/count.selector';
import {
    MultiplyCountSelector,
    MULTIPLY_COUNT_SELECTOR
} from './selectors/multiply-count/multiply-count.selector';

@injectable()
export class CounterPresenter {
    constructor(
        @inject(COUNT_SELECTOR) private countSelector: CountSelector,
        @inject(MULTIPLY_COUNT_SELECTOR)
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
