import { Builder } from './stores.types';

export interface InteractionConstructor<S, T> {
    make(state: S, params?: number): T;
}

export class InteractionBuilder<S, R> implements Builder<S, R> {
    static make<B, C>(
        interaction: InteractionConstructor<B, C>
    ): InteractionBuilder<B, C> {
        return new InteractionBuilder(interaction);
    }

    private params: number | undefined = undefined;

    constructor(private interaction: InteractionConstructor<S, R>) {}

    withParams(params: number): this {
        this.params = params;
        return this;
    }
    build(store: S): R {
        return this.interaction.make(store, this.params);
    }
}
