import { CounterRemoteSourceService } from '@api/counterRemoteSource/counterRemoteSource.service';
import { CounterSource, CounterSourceModel } from './counter-source.types';

export class CounterSourceStore implements CounterSourceModel {
    static make(): CounterSourceStore {
        const counterRemoteService = new CounterRemoteSourceService();
        return new CounterSourceStore(counterRemoteService);
    }

    constructor(public counterRemoteService: CounterRemoteSourceService) {}

    private get source(): CounterSource {
        return this.counterRemoteService;
    }

    get(): Promise<number> {
        return this.source.get();
    }

    increment(value: number): Promise<number> {
        return this.source.increment(value);
    }

    save(value: number): Promise<number> {
        return this.source.save(value);
    }
}
