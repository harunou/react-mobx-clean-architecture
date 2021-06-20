import { Context } from 'react';
import { DependencyContainer } from 'tsyringe';
import { ContainerProvider } from './store.types';

export function makeContentProviderComponent(
    Context: Context<DependencyContainer>
): ContainerProvider {
    const Provider: ContainerProvider = ({ container, children }) => {
        return (
            <Context.Provider value={container}>{children}</Context.Provider>
        );
    };
    return Provider;
}
