import { createContext } from 'react';
import type { RootAggregate } from 'src/types';

export const RootStoreContext = createContext<RootAggregate>({} as RootAggregate);
