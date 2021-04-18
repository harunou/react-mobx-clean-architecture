import {
    Selector,
    SelectorInteractionBuilder
} from '../selector/selector.types';
import { UseCaseInteractionBuilder } from '../usecase/usecase.types';

export abstract class Store<S, P> {
    constructor(private appStore: S, private persistenceStore: P) {}

    query<R>(selector: SelectorInteractionBuilder<S, R>): Selector<R> {
        return selector.build(this.appStore);
    }

    async execute(useCase: UseCaseInteractionBuilder<S, P>): Promise<void> {
        await useCase.build(this.appStore, this.persistenceStore).execute();
    }
}
