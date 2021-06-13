import { configure } from 'mobx';
import { persistenceRegistry } from '@stores/persistence/persistence.registry';
import { Registry } from '@stores/helpers/registry/registry';
import { domainRegistry } from '@stores/domain/domain.registry';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export const rootRegistry = Registry.make()
    .merge(domainRegistry)
    .merge(persistenceRegistry);
