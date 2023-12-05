type ParametrizedFunctionArguments<T extends readonly unknown[]> = {
    0: [];
    1: [T[0]];
    2: [T[0], T[1]];
    3: [T[0], T[1], T[2]];
    4: [T[0], T[1], T[2], T[3]];
    5: [T[0], T[1], T[2], T[3], T[4]];
}[T extends readonly []
    ? 0
    : T extends readonly [unknown]
    ? 1
    : T extends readonly [unknown, unknown]
    ? 2
    : T extends readonly [unknown, unknown, unknown]
    ? 3
    : T extends readonly [unknown, unknown, unknown, unknown]
    ? 4
    : T extends readonly [unknown, unknown, unknown, unknown, unknown]
    ? 5
    : never];

export type ParametrizedFunction<T extends readonly unknown[], TReturn> = (
    ...args: ParametrizedFunctionArguments<T>
) => TReturn;
