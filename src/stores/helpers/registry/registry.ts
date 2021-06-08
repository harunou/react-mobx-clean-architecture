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
import constructor from 'tsyringe/dist/typings/types/constructor';

interface Registration<T> {
    token: InjectionToken<T>;
    providerOrConstructor: Provider<T> | constructor<T>;
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

    public add<T>(token: InjectionToken<T>, provider: ValueProvider<T>): this;
    public add<T>(token: InjectionToken<T>, provider: FactoryProvider<T>): this;
    public add<T>(
        token: InjectionToken<T>,
        provider: TokenProvider<T>,
        options?: RegistrationOptions
    ): this;
    public add<T>(
        token: InjectionToken<T>,
        provider: ClassProvider<T>,
        options?: RegistrationOptions
    ): this;
    public add<T>(
        token: InjectionToken<T>,
        provider: constructor<T>,
        options?: RegistrationOptions
    ): this;
    public add<T>(
        token: InjectionToken<T>,
        providerOrConstructor: Provider<T> | constructor<T>,
        options: RegistrationOptions = { lifecycle: Lifecycle.Transient }
    ): this {
        this.#registrations.push({ token, providerOrConstructor, options });
        return this;
    }

    public applyTo(container: DependencyContainer): this {
        this.#registrations.forEach(
            ({ token, providerOrConstructor, options }) => {
                container.register(
                    token,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    providerOrConstructor as any,
                    options
                );
            }
        );
        return this;
    }

    public merge(registry: Registry): this {
        this.#registrations = this.#registrations.concat(
            registry.registrations
        );
        return this;
    }
}
