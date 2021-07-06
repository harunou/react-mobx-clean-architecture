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

    set(value: number): Promise<number> {
        return this.source.set(value);
    }

    get(): Promise<number> {
        return this.source.get();
    }

    increment(value: number): Promise<number> {
        return this.source.increment(value);
    }
}
