import { makeTestHttpClient } from './test-http-client';
import { TestHttpClient } from './test-http-client.types';

describe(`TestHttpClient`, () => {
    let testHttpClient: TestHttpClient;
    beforeEach(() => {
        testHttpClient = makeTestHttpClient();
    });
    it('finds pending request with match', () => {
        const endpoint = 'counter';
        testHttpClient.request(endpoint);
        const m = testHttpClient.expect(endpoint);
        expect(m.endpoint).toEqual(endpoint);
    });
    it('finds pending request with match and allows to resolve it', async () => {
        const endpoint = 'counter';
        const resolveValue = 3;
        const r = testHttpClient.request(endpoint);
        testHttpClient.expect<number>(endpoint).resolve(resolveValue);
        await expect(r).resolves.toEqual(resolveValue);
    });
    it('finds pending request with match and allows to reject it', async () => {
        const endpoint = 'counter';
        const error = new Error('error');
        const r = testHttpClient.request(endpoint);
        testHttpClient.expect(endpoint).reject(error);
        await expect(r).rejects.toEqual(error);
    });
    it('verifies unresolved requests', () => {
        const endpoint = 'counter';
        testHttpClient.request(endpoint);
        expect(() => testHttpClient.verify()).toThrow();
    });
    it('cleans all pending requests', () => {
        const endpoint = 'counter';
        testHttpClient.request(endpoint);
        testHttpClient.clean();
        expect(() => testHttpClient.verify()).not.toThrow();
    });
});
