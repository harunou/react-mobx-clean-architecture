export interface AdapterConstructor<S, A> {
    new (rootStore: S): A;
}

export type UseAdapter<S> = <C, P>(
    ControllerConstructor: AdapterConstructor<S, C>,
    PresenterConstructor: AdapterConstructor<S, P>
) => {
    controller: C;
    presenter: P;
};

export interface MountedHook {
    mounted(): void;
}

export interface UnmountedHook {
    unmounted(): void;
}
