import { makeAsyncRequest, makeAsyncThrow } from '../testing-tools';

export class CountService {
    static successResponses = 0;

    static make(): CountService {
        return new CountService();
    }
    saveSuccess(value: number): Promise<number> {
        return makeAsyncRequest(0, value).then((v) => {
            CountService.successResponses += 1;
            return v;
        });
    }
    saveFailure(value: number): Promise<number> {
        return makeAsyncThrow(0, value);
    }
}
