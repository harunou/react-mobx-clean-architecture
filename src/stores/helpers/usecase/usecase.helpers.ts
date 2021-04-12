import { UseCase, UseCaseBuilder, UseCaseConstructor } from './usecase.types';

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
