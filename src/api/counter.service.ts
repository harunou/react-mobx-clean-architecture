import { httpClient } from '@core/http-client';
import { CounterSource } from '@stores/counter-source/counter-source.types';
import { container, InjectionToken } from 'tsyringe';

export const COUNTER_GET_COUNT_ENDPOINT = 'counter/get';
export const COUNTER_INCREMENT_ENDPOINT = 'counter/increment';
export const COUNTER_SAVE_COUNT_ENDPOINT = 'counter/save';

export class CounterRemoteService implements CounterSource {
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

export const COUNTER_REMOTE_SERVICE: InjectionToken<CounterRemoteService> = Symbol(
    'COUNTER_REMOTE_SERVICE'
);

container.register(COUNTER_REMOTE_SERVICE, CounterRemoteService);
