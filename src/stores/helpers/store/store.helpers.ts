import {
    Selector,
    SelectorInteractionBuilder,
    StoreExecuter,
    StoreQuery,
    UseCaseInteractionBuilder
} from './store.types';

export abstract class Store<S, P>
    implements StoreQuery<S>, StoreExecuter<S, P> {
    constructor(private appStore: S, private persistenceStore: P) {}

    query<L extends Selector>(selector: SelectorInteractionBuilder<S, L>): L {
        return selector.build(this.appStore);
    }

    execute(useCase: UseCaseInteractionBuilder<S, P>): void {
        useCase.build(this.appStore, this.persistenceStore).execute();
    }
}
