export interface ApiRequestParams {
    signal?: AbortSignal;
}

export interface ApiHttpClient {
    request: <TResponse>(request: Request) => Promise<TResponse>;
}
