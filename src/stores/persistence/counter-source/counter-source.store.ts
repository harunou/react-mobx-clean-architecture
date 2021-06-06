import { COUNTER_REMOTE_SERVICE } from '@api/counter.service';
import { inject, injectable } from 'tsyringe';
import { CounterSource } from './counter-source.types';

@injectable()
export class CounterSourceStore implements CounterSource {
    constructor(
        @inject(COUNTER_REMOTE_SERVICE)
        public counterRemoteService: CounterSource
    ) {}

    private get service(): CounterSource {
        return this.counterRemoteService;
    }

    get(): Promise<number> {
        return this.service.get();
    }

    increment(value: number): Promise<number> {
        return this.service.increment(value);
    }

    save(value: number): Promise<number> {
        return this.service.save(value);
    }
}
