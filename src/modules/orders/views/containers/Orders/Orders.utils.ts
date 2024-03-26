import { useContext, useEffect } from 'react';
import { RootStoreContext } from 'src/contexts';
import type { AbstractOrdersStore } from 'src/modules/orders/types';

export const useAttachOrdersStoreToRootStore = (ordersStore: AbstractOrdersStore): void => {
    const rootStore = useContext(RootStoreContext);
    useEffect(() => {
        rootStore.setOrdersStore(ordersStore);
        return () => rootStore.setOrdersStore(undefined);
    }, [rootStore, ordersStore]);
};
