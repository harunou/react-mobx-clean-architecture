import { configure } from 'mobx';
import { domainModule } from '@stores/domain/domain.module';
import { persistenceModule } from '@stores/persistence/persistence.module';
import { Registration } from '@stores/helpers/store.types';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: false
});

export const rootModule: Registration[] = [
    ...domainModule,
    ...persistenceModule
];
