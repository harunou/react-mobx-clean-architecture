import { Registry } from '@stores/helpers/registry/registry';
import { Lifecycle } from 'tsyringe';
import { CounterRemoteSourceService } from './counterRemoteSource/counterRemoteSource.service';

export const apiRegistry = Registry.make().add({
    token: CounterRemoteSourceService,
    useClass: CounterRemoteSourceService,
    options: { lifecycle: Lifecycle.Singleton }
});
