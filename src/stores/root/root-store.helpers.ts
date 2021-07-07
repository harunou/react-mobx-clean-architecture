import { CounterStore } from '@stores/domain/counter/counter-store';
import { makeStoreContext } from '@stores/helpers/stores.helpers';
import { CounterSourceStore } from '@stores/persistence/counter-source/counter-source-store';
import { RootStore } from './root-store';

export const [
    RootStoreContext,
    useContextRootStore
] = makeStoreContext<RootStore>();

export const sliceCounterStore = (rootStore: RootStore): CounterStore => {
    return rootStore.domain.counter;
};

export const sliceCounterSourceStore = (
    rootStore: RootStore
): CounterSourceStore => {
    return rootStore.persistence.counterSource;
};
