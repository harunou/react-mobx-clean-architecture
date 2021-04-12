import {
    Selector,
    SelectorInteractionBuilder
} from './selector/selector.types';
import { UseCaseBuilder } from './usecase/usecase.types';

export abstract class Store<S, P> {
    constructor(private appStore: S, private persistenceStore: P) {}

    query<R>(selector: SelectorInteractionBuilder<S, R>): Selector<R> {
        return selector.build(this.appStore);
    }

    execute(useCase: UseCaseBuilder<S, P>): void {
        useCase.build(this.appStore, this.persistenceStore).execute();
    }
}
