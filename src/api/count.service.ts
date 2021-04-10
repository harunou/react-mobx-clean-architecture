import { makeAsyncRequest, makeAsyncThrow } from '../testing-tools';

export class CountService {
    static make(): CountService {
        return new CountService();
    }
    saveSuccess(value: number): Promise<number> {
        return makeAsyncRequest(0, value);
    }
    saveFailure(value: number): Promise<number> {
        return makeAsyncThrow(0, value);
    }
}
