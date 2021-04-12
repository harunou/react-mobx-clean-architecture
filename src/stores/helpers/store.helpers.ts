import {
    Selector,
    SelectorInteractionBuilder
} from './selector/selector.types';
import { UseCaseInteractionBuilder } from './usecase/usecase.types';

export abstract class Store<S, P> {
    constructor(private appStore: S, private persistenceStore: P) {}

    query<R>(selector: SelectorInteractionBuilder<S, R>): Selector<R> {
        return selector.build(this.appStore);
    }

    execute(useCase: UseCaseInteractionBuilder<S, P>): void {
        useCase.build(this.appStore, this.persistenceStore).execute();
    }
}
