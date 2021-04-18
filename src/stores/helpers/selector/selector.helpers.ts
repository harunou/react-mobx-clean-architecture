import { Selector, SelectorInteractionBuilder } from '../store/store.types';
import { SelectorConstructor } from './selector.types';

export class SelectorBuilder<S, Props, R>
    implements SelectorInteractionBuilder<S, R> {
    static make<CS, CProps, CR>(
        selectorConstructor: SelectorConstructor<CS, CProps, CR>
    ): SelectorBuilder<CS, CProps, CR> {
        return new SelectorBuilder(selectorConstructor);
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
