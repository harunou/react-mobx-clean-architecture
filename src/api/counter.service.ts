import { makeAsyncRequest, makeAsyncThrow } from '../testing-tools';
import { CounterDataSource as CounterDataSource } from './counter.types';

export class CounterService implements CounterDataSource {
    // NOTE(harunou): for testing purposes
    static successResponses = 0;
    static incrementResponses = 0;

    static make(): CounterService {
        return new CounterService();
    }
    increment(increment: number, count: number): Promise<number> {
        return makeAsyncRequest(0, increment + count).then((v) => {
            CounterService.incrementResponses += 1;
            return v;
        });
    }
    saveSuccess(value: number): Promise<number> {
        return makeAsyncRequest(0, value).then((v) => {
            CounterService.successResponses += 1;
            return v;
        });
    }
    saveFailure(value: number): Promise<number> {
        return makeAsyncThrow(0, value);
    }
}
