import type { ParametrizedFunction } from './ParametrizedFunction';

export type EffectRun<TArgs extends readonly unknown[] = [], TReturn = void> = ParametrizedFunction<
    TArgs,
    Promise<TReturn>
>;

export interface Effect<TArgs extends readonly unknown[] = [], TReturn = void> {
    run: EffectRun<TArgs, TReturn>;
}

export interface EffectParams {
    signal?: AbortSignal;
}
