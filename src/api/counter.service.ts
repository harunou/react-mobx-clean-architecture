import { httpClient } from '@core/http-client';
import { CounterDataSource as CounterDataSource } from './counter.types';

export const COUNTER_INCREMENT_ENDPOINT = 'counter/increment';
export const COUNTER_SAVE_COUNT_ENDPOINT = 'counter/save';

export class CounterService implements CounterDataSource {
    static make(): CounterService {
        return new CounterService();
    }
    increment(increment: number): Promise<number> {
        return httpClient.request(COUNTER_INCREMENT_ENDPOINT, { increment });
    }
    save(count: number): Promise<number> {
        return httpClient.request(COUNTER_SAVE_COUNT_ENDPOINT, { count });
    }
}
