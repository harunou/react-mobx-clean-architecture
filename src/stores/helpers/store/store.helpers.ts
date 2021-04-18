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

    query<R>(selector: SelectorInteractionBuilder<S, R>): Selector<R> {
        return selector.build(this.appStore);
    }

    async execute(useCase: UseCaseInteractionBuilder<S, P>): Promise<void> {
        await useCase.build(this.appStore, this.persistenceStore).execute();
    }
}
