import { UseCase } from '../store/store.types';

export interface UseCaseParams<S, R, P> {
    store: S;
    persistence: R;
    props: P | undefined;
}

export interface UseCaseConstructor<S, R, P> {
    make(params: UseCaseParams<S, R, P>): UseCase;
}
