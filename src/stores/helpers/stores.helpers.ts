import {
    Selector,
    SelectorBuilder,
    UseCase,
    UseCaseBuilder
} from './stores.types';

export interface SelectorInteractionConstructor<S> {
    make(state: S, params?: number): Selector;
}

export class SelectorInteractionBuilder<S> implements SelectorBuilder<S> {
    static make<T>(
        interaction: SelectorInteractionConstructor<T>
    ): SelectorInteractionBuilder<T> {
        return new SelectorInteractionBuilder(interaction);
    }

    private params: number | undefined = undefined;

    constructor(private interaction: SelectorInteractionConstructor<S>) {}

    withParams(params: number): this {
        this.params = params;
        return this;
    }
    build(store: S): Selector {
        return this.interaction.make(store, this.params);
    }
}

export interface UseCaseInteractionConstructor<S, P> {
    make(state: S, persistence: P, params?: number): UseCase;
}

export class UseCaseInteractionBuilder<S, P> implements UseCaseBuilder<S, P> {
    static make<T, R>(
        interaction: UseCaseInteractionConstructor<T, R>
    ): UseCaseInteractionBuilder<T, R> {
        return new UseCaseInteractionBuilder(interaction);
    }

    private params: number | undefined = undefined;

    constructor(private interaction: UseCaseInteractionConstructor<S, P>) {}

    withParams(params: number): this {
        this.params = params;
        return this;
    }
    build(store: S, persistence: P): UseCase {
        return this.interaction.make(store, persistence, this.params);
    }
}
