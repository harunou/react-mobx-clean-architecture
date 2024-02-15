import { TestHttpClient } from 'test-http-client';
import type { RequestMatcher as LibRequestMatcher } from 'test-http-client/build/TestHttpClient';

export const testHttpClient = TestHttpClient.make();
export type RequestMatcher = LibRequestMatcher;
