import { DependencyContainer, InjectionToken } from 'tsyringe';
import { Registration } from './store.types';

export const makeInjectionToken = <T = unknown>(
    key: string
): InjectionToken<T> => {
    return Symbol(key);
};

export const registerInContainer = (
    container: DependencyContainer,
    module: Registration[]
): void => {
    module.reduce(
        (acc: DependencyContainer, { token, options, ...provider }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return acc.register(token, provider as any, options);
        },
        container
    );
};
