import { Selector, SelectorInteractionBuilder } from '../store/store.types';
import { SelectorConstructor } from './selector.types';

export class SelectorBuilder<S, P, L extends Selector>
    implements SelectorInteractionBuilder<S, L> {
    static make<CS, CP, CL extends Selector>(
        selectorConstructor: SelectorConstructor<CS, CP, CL>
    ): SelectorBuilder<CS, CP, CL> {
        return new SelectorBuilder(selectorConstructor);
    }

    private props: P | undefined = undefined;

    constructor(private selectorConstructor: SelectorConstructor<S, P, L>) {}

    withProps(props: P): this {
        this.props = props;
        return this;
    }
    build(store: S): L {
        return this.selectorConstructor.make({ store, props: this.props });
    }
}
