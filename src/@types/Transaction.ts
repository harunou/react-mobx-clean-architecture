import type { ParametrizedFunction } from './ParametrizedFunction';

export type TransactionCommit<TArgs extends readonly unknown[] = []> = ParametrizedFunction<
    TArgs,
    void
>;

export interface Transaction<TArgs extends readonly unknown[] = []> {
    commit: ParametrizedFunction<TArgs, void>;
}
