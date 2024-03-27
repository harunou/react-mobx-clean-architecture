import { useContext, useEffect } from 'react';
import { RootStoreContext } from 'src/contexts';
import type { OrdersAggregate } from 'src/modules/orders/types';

export const useAttachOrdersStoreToRootStore = (ordersStore: OrdersAggregate): void => {
    const rootStore = useContext(RootStoreContext);
    useEffect(() => {
        rootStore.setOrdersStore(ordersStore);
        return () => rootStore.setOrdersStore(undefined);
    }, [rootStore, ordersStore]);
};
