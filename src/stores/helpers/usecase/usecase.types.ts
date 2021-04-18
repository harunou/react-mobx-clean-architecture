import { UseCase } from '../store/store.types';

export interface UseCaseMakeParams<S, R, P> {
    store: S;
    persistence: R;
    props: P | undefined;
}

export interface UseCaseConstructor<S, R, P> {
    make(params: UseCaseMakeParams<S, R, P>): UseCase;
}
