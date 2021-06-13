import { CounterRemoteSourceService } from '@api/counterRemoteSource/counterRemoteSource.service';
import { injectable } from 'tsyringe';
import { CounterSource } from './counter-source.types';

@injectable()
export class CounterSourceStore implements CounterSource {
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
