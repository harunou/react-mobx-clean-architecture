export interface CancelEffect {
    cancel(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- NOTE(harunou): any is needed to extract primitive types number | string | symbol
export interface CancelEffects<T extends keyof any = string> {
    add(id: T, effect: CancelEffect): void;
    remove(id: T, effect: CancelEffect): void;
}
