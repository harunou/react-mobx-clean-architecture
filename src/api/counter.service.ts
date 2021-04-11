import { makeAsyncRequest, makeAsyncThrow } from '../testing-tools';

export class CounterService {
    // NOTE(harunou): for testing purposes
    static successResponses = 0;

    static make(): CounterService {
        return new CounterService();
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
