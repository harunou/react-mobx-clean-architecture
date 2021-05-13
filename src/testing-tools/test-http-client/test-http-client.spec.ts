import { makeTestHttpClient } from './test-http-client';
import { TestHttpClient } from './test-http-client.types';

describe(`TestHttpClient`, () => {
    let testHttpClient: TestHttpClient;
    beforeEach(() => {
        testHttpClient = makeTestHttpClient();
    });
    it('finds pending request with match', () => {
        const { request, match } = testHttpClient;
        const endpoint = 'counter';
        request(endpoint);
        const m = match(endpoint);
        expect(m.endpoint).toEqual(endpoint);
    });
    it('finds pending request with match and allows to resolve it', async () => {
        const { request, match } = testHttpClient;
        const endpoint = 'counter';
        const resolveValue = 3;
        const r = request<number>(endpoint);
        const m = match<number>(endpoint);
        m.resolve(resolveValue);
        await expect(r).resolves.toEqual(resolveValue);
    });
    it('finds pending request with match and allows to reject it', async () => {
        const { request, match } = testHttpClient;
        const endpoint = 'counter';
        const error = new Error('error');
        const r = request<number>(endpoint);
        const m = match<number>(endpoint);
        m.reject(error);
        await expect(r).rejects.toEqual(error);
    });
    it('verifies unresolved requests', () => {
        const { request, verify } = testHttpClient;
        const endpoint = 'counter';
        request<number>(endpoint);
        expect(() => verify()).toThrow();
    });
    it('cleans all pending requests', () => {
        const { request, clean, verify } = testHttpClient;
        const endpoint = 'counter';
        request<number>(endpoint);
        clean();
        expect(() => verify()).not.toThrow();
    });
});
