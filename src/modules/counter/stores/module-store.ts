import { makeObservable, observable } from 'mobx';
import { ModuleModel } from './module-store.types';

export class ModuleStore implements ModuleModel {
    static make(): ModuleStore {
        return new ModuleStore();
    }

    public module$ = 'counter';

    constructor() {
        makeObservable(this, {
            module$: observable
        });
    }
}
