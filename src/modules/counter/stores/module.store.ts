import { makeObservable, observable } from 'mobx';

export class ModuleStore {
    static make(): ModuleStore {
        return new ModuleStore();
    }

    public module = 'counter';

    constructor() {
        makeObservable(this, {
            module: observable
        });
    }
}
