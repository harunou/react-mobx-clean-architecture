import {
    Selector,
    SelectorBuilder,
    SelectorConstructor,
    UseCase,
    UseCaseBuilder,
    UseCaseConstructor
} from './stores.types';

export class SelectorInteractionBuilder<S> implements SelectorBuilder<S> {
    static make<T>(
        selectorConstructor: SelectorConstructor<T>
    ): SelectorInteractionBuilder<T> {
        return new SelectorInteractionBuilder(selectorConstructor);
    }

    private params: number | undefined = undefined;

    constructor(private selectorConstructor: SelectorConstructor<S>) {}

    withParams(params: number): this {
        this.params = params;
        return this;
    }
    build(store: S): Selector {
        return this.selectorConstructor.make({ store, params: this.params });
    }
}

export class UseCaseInteractionBuilder<S, P> implements UseCaseBuilder<S, P> {
    static make<T, R>(
        useCaseConstructor: UseCaseConstructor<T, R>
    ): UseCaseInteractionBuilder<T, R> {
        return new UseCaseInteractionBuilder(useCaseConstructor);
    }

    private params: number | undefined = undefined;

    constructor(private useCaseConstructor: UseCaseConstructor<S, P>) {}

    withParams(params: number): this {
        this.params = params;
        return this;
    }
    build(store: S, persistence: P): UseCase {
        return this.useCaseConstructor.make({
            store,
            persistence,
            params: this.params
        });
    }
}

export abstract class AppStore<S, P> {
    constructor(private domain: S, private persistence: P) {}

    query(selector: SelectorBuilder<S>): Selector {
        return selector.build(this.domain);
    }

    execute(useCase: UseCaseBuilder<S, P>): void {
        useCase.build(this.domain, this.persistence).execute();
    }
}
