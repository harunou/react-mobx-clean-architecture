import { makeObservable, observable } from 'mobx';

export class FeatureStore {
    static make(): FeatureStore {
        return new FeatureStore();
    }

    public feature = 'feature';

    constructor() {
        makeObservable(this, {
            feature: observable
        });
    }
}
