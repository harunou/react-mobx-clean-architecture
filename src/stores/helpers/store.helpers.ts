import { InjectionToken } from 'tsyringe';

export const makeInjectionToken = <T = unknown>(
    key: string
): InjectionToken<T> => {
    return Symbol(key);
};
