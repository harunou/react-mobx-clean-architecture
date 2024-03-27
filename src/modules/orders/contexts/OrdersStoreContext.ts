import { createContext } from 'react';
import type { OrdersAggregate } from 'src/modules/orders/types';

export const OrdersStoreContext = createContext<OrdersAggregate>({} as OrdersAggregate);
