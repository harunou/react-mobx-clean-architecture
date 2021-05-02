import { httpClient } from '@core/http-client';
import { CounterSource } from '@stores/persistence/counter-source.types';

export const COUNTER_GET_COUNT_ENDPOINT = 'counter/get';
export const COUNTER_INCREMENT_ENDPOINT = 'counter/increment';
export const COUNTER_SAVE_COUNT_ENDPOINT = 'counter/save';

export class CounterService implements CounterSource {
    static make(): CounterService {
        return new CounterService();
    }
    get(): Promise<number> {
        return httpClient.request(COUNTER_GET_COUNT_ENDPOINT);
    }
    increment(increment: number): Promise<number> {
        return httpClient.request(COUNTER_INCREMENT_ENDPOINT, { increment });
    }
    save(count: number): Promise<number> {
        return httpClient.request(COUNTER_SAVE_COUNT_ENDPOINT, { count });
    }
}
