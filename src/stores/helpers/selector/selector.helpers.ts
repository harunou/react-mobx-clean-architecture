import {
    Selector,
    SelectorBuilder,
    SelectorConstructor
} from './selector.types';

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
