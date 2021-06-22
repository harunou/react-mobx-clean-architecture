import { computed, makeObservable } from 'mobx';
import { injectable } from 'tsyringe';
import { CountSelector } from './selectors/count/count.selector';
import { MultiplyCountSelector } from './selectors/multiply-count/multiply-count.selector';

@injectable()
export class CounterPresenter {
    constructor(
        private countSelector: CountSelector,
        private multiplyCountSelector: MultiplyCountSelector
    ) {
        makeObservable(this, {
            selectMultiplyCountOnTen: computed,
            selectCount: computed
        });
    }
    get selectMultiplyCountOnTen(): number {
        return this.multiplyCountSelector.withProps(10).result;
    }

    get selectCount(): number {
        return this.countSelector.result;
    }
}
