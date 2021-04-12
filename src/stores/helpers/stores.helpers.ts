import {
    Selector,
    SelectorBuilder,
    SelectorConstructor,
    UseCase,
    UseCaseBuilder,
    UseCaseConstructor
} from '../stores.types';

export class SelectorInteractionBuilder<S, Props, R>
    implements SelectorBuilder<S, R> {
    static make<CS, CProps, CR>(
        selectorConstructor: SelectorConstructor<CS, CProps, CR>
    ): SelectorInteractionBuilder<CS, CProps, CR> {
        return new SelectorInteractionBuilder(selectorConstructor);
    }

    private props: Props | undefined = undefined;

    constructor(
        private selectorConstructor: SelectorConstructor<S, Props, R>
    ) {}

    withProps(props: Props): this {
        this.props = props;
        return this;
    }
    build(store: S): Selector<R> {
        return this.selectorConstructor.make({ store, props: this.props });
    }
}

export class UseCaseInteractionBuilder<S, P, Props>
    implements UseCaseBuilder<S, P> {
    static make<CS, CP, CProps>(
        useCaseConstructor: UseCaseConstructor<CS, CP, CProps>
    ): UseCaseInteractionBuilder<CS, CP, CProps> {
        return new UseCaseInteractionBuilder(useCaseConstructor);
    }

    private props: Props | undefined = undefined;

    constructor(private useCaseConstructor: UseCaseConstructor<S, P, Props>) {}

    withProps(props: Props): this {
        this.props = props;
        return this;
    }
    build(store: S, persistence: P): UseCase {
        return this.useCaseConstructor.make({
            store,
            persistence,
            props: this.props
        });
    }
}

export abstract class Store<S, P> {
    constructor(private appStore: S, private persistenceStore: P) {}

    query<R>(selector: SelectorBuilder<S, R>): Selector<R> {
        return selector.build(this.appStore);
    }

    execute(useCase: UseCaseBuilder<S, P>): void {
        useCase.build(this.appStore, this.persistenceStore).execute();
    }
}
