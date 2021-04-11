export interface Selector {
    result: number;
}

export interface SelectorBuilder<S> {
    build(state: S): Selector;
}

export interface UseCase {
    execute(): void;
}

export interface UseCaseBuilder<S, P> {
    build(state: S, persistence: P): UseCase;
}

export interface StoreQuery<S> {
    query(builder: SelectorBuilder<S>): Selector;
}

export interface StoreExecuter<S, P> {
    execute(builder: UseCaseBuilder<S, P>): void;
}

export abstract class AppStore<S, P> {
    constructor(private domain: S, private persistence: P) {}

    query(selector: SelectorBuilder<S>): Selector {
        return selector.build(this.domain);
    }

    execute(useCase: UseCaseBuilder<S, P>): void {
        useCase.build(this.domain, this.persistence).execute();
    }
}
