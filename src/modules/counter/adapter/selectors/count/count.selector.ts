import { CounterState } from '@stores/domain/counter/counter.types';
import { Selector } from '@stores/helpers/store.types';
import { computed, makeObservable } from 'mobx';
import { injectable } from 'tsyringe';

@injectable()
export class CountSelector implements Selector {
    constructor(private store: CounterState) {
        makeObservable(this, {
            result: computed
        });
    }

    get result(): number {
        return this.store.count$;
    }
}
