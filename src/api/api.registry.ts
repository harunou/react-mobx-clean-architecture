import { Registry } from '@stores/helpers/registry/registry';
import { CounterRemoteSourceService } from './counterRemoteSource/counterRemoteSource.service';

export const apiRegistry = Registry.make().addSingleton(
    CounterRemoteSourceService
);
