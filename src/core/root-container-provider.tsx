import { Registry } from '@stores/helpers/registry/registry';
import { createContext, FC } from 'react';
import { container } from 'tsyringe';

const rootContainer = container.createChildContainer();
export const RootContainerContext = createContext(rootContainer);

export const RootContainerProvider: FC<{ registry: Registry }> = ({
    registry,
    children
}) => {
    registry.forwardTo(rootContainer);
    return (
        <RootContainerContext.Provider value={rootContainer}>
            {children}
        </RootContainerContext.Provider>
    );
};
