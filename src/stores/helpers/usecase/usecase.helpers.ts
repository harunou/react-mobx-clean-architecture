import { UseCaseInteractionBuilder } from '../store/store.types';
import { UseCaseConstructor } from './usecase.types';

export class UseCaseBuilder<S, R, P, U>
    implements UseCaseInteractionBuilder<S, R, U> {
    static make<CS, CR, CP, CU>(
        useCaseConstructor: UseCaseConstructor<CS, CR, CP, CU>
    ): UseCaseBuilder<CS, CR, CP, CU> {
        return new UseCaseBuilder(useCaseConstructor);
    }

    private props: P | undefined = undefined;

    constructor(private useCaseConstructor: UseCaseConstructor<S, R, P, U>) {}

    withProps(props: P): this {
        this.props = props;
        return this;
    }
    build(store: S, persistence: R): U {
        return this.useCaseConstructor.make({
            store,
            persistence,
            props: this.props
        });
    }
}
