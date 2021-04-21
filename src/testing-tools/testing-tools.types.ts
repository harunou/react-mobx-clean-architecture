export interface PendingRequest<R, P> {
    endpoint: string;
    params?: P;
    resolve: (v: R) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (r: any) => void;
}

export interface TestHttpClient {
    request: <R, P = unknown>(endpoint: string, params?: P) => Promise<R>;
    match: <R, P = unknown>(endpoint: string) => PendingRequest<R, P>;
    verify: () => void;
    clean: () => void;
}
