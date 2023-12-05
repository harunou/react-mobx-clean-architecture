import type { ParametrizedFunction } from './ParametrizedFunction';

export type UseCaseExecute<TArgs extends readonly unknown[] = []> = ParametrizedFunction<
    TArgs,
    Promise<void>
>;

export interface UseCase<TArgs extends readonly unknown[] = []> {
    execute: ParametrizedFunction<TArgs, Promise<void>>;
}
