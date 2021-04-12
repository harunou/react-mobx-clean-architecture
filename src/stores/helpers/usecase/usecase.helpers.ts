import {
    UseCase,
    UseCaseInteractionBuilder,
    UseCaseConstructor
} from './usecase.types';

export class UseCaseBuilder<S, P, Props>
    implements UseCaseInteractionBuilder<S, P> {
    static make<CS, CP, CProps>(
        useCaseConstructor: UseCaseConstructor<CS, CP, CProps>
    ): UseCaseBuilder<CS, CP, CProps> {
        return new UseCaseBuilder(useCaseConstructor);
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
