import { action, makeObservable, observable } from 'mobx';
import { Domain, DomainState } from './domainStore.types';

export class DomainStore implements Domain {
    static make(initial: DomainState): DomainStore {
        return new DomainStore(initial);
    }

    $count = 0;

    constructor(initial: DomainState) {
        makeObservable(this, {
            $count: observable,
            init: action,
            setCount: action
        });
        this.init(initial);
    }

    init(initial: DomainState) {
        Object.assign(this, initial);
    }

    setCount(value: number): void {
        this.$count = value;
    }
}
