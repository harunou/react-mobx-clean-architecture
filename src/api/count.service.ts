import { makeAsyncRequest, makeAsyncThrow } from '../testing-tools';

export class CountService {
    saveSuccess(value: number): Promise<number> {
        return makeAsyncRequest(0, value);
    }
    saveFailure(value: number): Promise<number> {
        return makeAsyncThrow(0, value);
    }
}
