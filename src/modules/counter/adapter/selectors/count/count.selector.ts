import { COUNTER_STORE } from '@stores/domain/counter/counter.tokens';
import { CounterState } from '@stores/domain/counter/counter.types';
import { Selector } from '@stores/helpers/store/store.types';
import { computed, makeObservable } from 'mobx';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CountSelector implements Selector {
    constructor(@inject(COUNTER_STORE) private store: CounterState) {
        makeObservable(this, {
            result: computed
        });
    }

    get result(): number {
        return this.store.count$;
    }
}
