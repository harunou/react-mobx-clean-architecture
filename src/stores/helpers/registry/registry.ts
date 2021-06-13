import {
    ClassProvider,
    DependencyContainer,
    FactoryProvider,
    InjectionToken,
    Lifecycle,
    Provider,
    TokenProvider,
    ValueProvider,
    RegistrationOptions
} from 'tsyringe';

interface Registration<T> {
    token: InjectionToken<T>;
    provider: Provider<T>;
    options: RegistrationOptions;
}

export class Registry {
    static make(): Registry {
        return new Registry();
    }

    #registrations: Array<Registration<unknown>> = [];

    public get registrations(): Array<Registration<unknown>> {
        return this.#registrations;
    }

    public add<T>(
        registration: {
            token: InjectionToken<T>;
        } & ValueProvider<T>
    ): this;
    public add<T>(
        registration: {
            token: InjectionToken<T>;
        } & FactoryProvider<T>
    ): this;
    public add<T>(
        registration: {
            token: InjectionToken<T>;
            options?: RegistrationOptions;
        } & TokenProvider<T>
    ): this;
    public add<T>(
        registration: {
            token: InjectionToken<T>;
            options?: RegistrationOptions;
        } & ClassProvider<T>
    ): this;
    public add<T>(
        registration: {
            token: InjectionToken<T>;
            options?: RegistrationOptions;
        } & Provider<T>
    ): this {
        const {
            token,
            options = { lifecycle: Lifecycle.Transient },
            ...provider
        } = registration;
        this.#registrations.push({
            token,
            options,
            provider
        });
        return this;
    }

    public applyTo(container: DependencyContainer): this {
        this.#registrations.forEach(({ token, provider, options }) => {
            container.register(
                token,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                provider as any,
                options
            );
        });
        return this;
    }

    public merge(registry: Registry): this {
        this.#registrations = this.#registrations.concat(
            registry.registrations
        );
        return this;
    }
}