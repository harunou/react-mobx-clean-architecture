import {
    Selector,
    SelectorBuilder,
    SelectorConstructor,
    UseCase,
    UseCaseBuilder,
    UseCaseConstructor
} from './stores.types';

export class SelectorInteractionBuilder<Store, Props>
    implements SelectorBuilder<Store> {
    static make<CStore, CProps>(
        selectorConstructor: SelectorConstructor<CStore, CProps>
    ): SelectorInteractionBuilder<CStore, CProps> {
        return new SelectorInteractionBuilder(selectorConstructor);
    }

    private props: Props | undefined = undefined;

    constructor(
        private selectorConstructor: SelectorConstructor<Store, Props>
    ) {}

    withProps(props: Props): this {
        this.props = props;
        return this;
    }
    build(store: Store): Selector {
        return this.selectorConstructor.make({ store, props: this.props });
    }
}

export class UseCaseInteractionBuilder<Store, Per, Props>
    implements UseCaseBuilder<Store, Per> {
    static make<CStore, CPer, CProps>(
        useCaseConstructor: UseCaseConstructor<CStore, CPer, CProps>
    ): UseCaseInteractionBuilder<CStore, CPer, CProps> {
        return new UseCaseInteractionBuilder(useCaseConstructor);
    }

    private props: Props | undefined = undefined;

    constructor(
        private useCaseConstructor: UseCaseConstructor<Store, Per, Props>
    ) {}

    withProps(props: Props): this {
        this.props = props;
        return this;
    }
    build(store: Store, persistence: Per): UseCase {
        return this.useCaseConstructor.make({
            store,
            persistence,
            props: this.props
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
