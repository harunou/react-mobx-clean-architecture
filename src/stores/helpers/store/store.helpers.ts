import {
    Selector,
    SelectorInteractionBuilder,
    StoreExecuter,
    StoreQuery,
    UseCase,
    UseCaseInteractionBuilder
} from './store.types';

export abstract class Store<S, R>
    implements StoreQuery<S>, StoreExecuter<S, R> {
    constructor(public appStore: S, private persistenceStore: R) {}

    query<L extends Selector>(selector: SelectorInteractionBuilder<S, L>): L {
        return selector.build(this.appStore);
    }

    execute<U extends UseCase>(
        useCase: UseCaseInteractionBuilder<S, R, U>
    ): void {
        useCase.build(this.appStore, this.persistenceStore).execute();
    }
}
