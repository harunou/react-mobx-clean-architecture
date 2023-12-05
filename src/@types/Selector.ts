import type { ParametrizedFunction } from './ParametrizedFunction';

export type SelectorSelect<
    TArgs extends readonly unknown[] = [],
    TReturn = void,
> = ParametrizedFunction<TArgs, TReturn>;

export interface Selector<TArgs extends readonly unknown[] = [], TReturn = void> {
    select: ParametrizedFunction<TArgs, TReturn>;
}
