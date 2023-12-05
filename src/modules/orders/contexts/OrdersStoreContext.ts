import { createContext } from 'react';
import type { AbstractOrdersStore } from 'src/modules/orders/types';

export const OrdersStoreContext = createContext<AbstractOrdersStore>({} as AbstractOrdersStore);
