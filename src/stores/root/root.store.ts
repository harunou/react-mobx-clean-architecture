import { CounterRemoteService } from '@api/counter.service';
import { CounterSourceStore } from '@stores/counter-source/counter-source.store';
import { CounterStore } from '@stores/counter/counter.store';
import { configure } from 'mobx';
import { container, InjectionToken, Lifecycle } from 'tsyringe';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export const appContainer = container.createChildContainer();

export const COUNTER_STORE: InjectionToken<CounterStore> = Symbol(
    'COUNTER_STORE'
);

appContainer.register(
    COUNTER_STORE,
    { useClass: CounterStore },
    { lifecycle: Lifecycle.Singleton }
);

export const persistenceContainer = appContainer.createChildContainer();

export const COUNTER_SOURCE_STORE: InjectionToken<CounterSourceStore> = Symbol(
    'COUNTER_SOURCE_STORE'
);

persistenceContainer.register(
    COUNTER_SOURCE_STORE,
    { useClass: CounterRemoteService },
    { lifecycle: Lifecycle.Singleton }
);
