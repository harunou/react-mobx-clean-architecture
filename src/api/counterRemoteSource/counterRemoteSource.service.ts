import { httpClient } from '@core/http-client';
import { CounterSource } from '@stores/persistence/counter-source/counter-source-store.types';

export const COUNTER_SET_ENDPOINT = '/fake-api/counter/set';
export const COUNTER_GET_ENDPOINT = '/fake-api/counter/get';
export const COUNTER_INCREMENT_ENDPOINT = '/fake-api/counter/increment';

export class CounterRemoteSourceService implements CounterSource {
    static make(): CounterRemoteSourceService {
        return new CounterRemoteSourceService();
    }

    set(count: number): Promise<number> {
        return httpClient.request(COUNTER_SET_ENDPOINT, { count });
    }
    get(): Promise<number> {
        return httpClient.request(COUNTER_GET_ENDPOINT);
    }
    increment(increment: number): Promise<number> {
        return httpClient.request(COUNTER_INCREMENT_ENDPOINT, { increment });
    }
}
