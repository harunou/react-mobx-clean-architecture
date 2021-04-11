import {
    Selector,
    SelectorBuilder,
    SelectorConstructor,
    UseCase,
    UseCaseBuilder,
    UseCaseConstructor
} from '../stores.types';

export class SelectorInteractionBuilder<Store, Props, Resp>
    implements SelectorBuilder<Store, Resp> {
    static make<CStore, CProps, CResp>(
        selectorConstructor: SelectorConstructor<CStore, CProps, CResp>
    ): SelectorInteractionBuilder<CStore, CProps, CResp> {
        return new SelectorInteractionBuilder(selectorConstructor);
    }

    private props: Props | undefined = undefined;

    constructor(
        private selectorConstructor: SelectorConstructor<Store, Props, Resp>
    ) {}

    withProps(props: Props): this {
        this.props = props;
        return this;
    }
    build(store: Store): Selector<Resp> {
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

export abstract class RootStore<S, P> {
    constructor(private domain: S, private persistence: P) {}

    query<R>(selector: SelectorBuilder<S, R>): Selector<R> {
        return selector.build(this.domain);
    }

    execute(useCase: UseCaseBuilder<S, P>): void {
        useCase.build(this.domain, this.persistence).execute();
    }
}
