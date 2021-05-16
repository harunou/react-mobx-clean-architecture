export interface PendingRequest<R, P> {
    endpoint: string;
    params: P;
    resolve: (v: R) => void;
    reject: (r: Error) => void;
}

export interface TestHttpClient {
    request: <R, P = unknown>(endpoint: string, params?: P) => Promise<R>;
    expect: <R, P = unknown>(endpoint: string) => PendingRequest<R, P>;
    verify: () => void;
    clean: () => void;
}
