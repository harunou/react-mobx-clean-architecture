import { testHttpClient } from 'src/utils/testing';
import type { ApiHttpClient } from '../api.types';

export class HttpClient implements ApiHttpClient {
    static make(): ApiHttpClient {
        return process.env.NODE_ENV === 'test' ? testHttpClient : new HttpClient();
    }
    request<T>(): Promise<T> {
        return Promise.resolve({} as T);
    }
}
