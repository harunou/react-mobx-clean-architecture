import { createContext } from 'react';
import type { AbstractRootStore } from 'src/types';

export const RootStoreContext = createContext<AbstractRootStore>({} as AbstractRootStore);
