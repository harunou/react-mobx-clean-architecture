import { InjectionToken, Provider, RegistrationOptions } from 'tsyringe';

export type Registration = {
    token: InjectionToken;
    options?: RegistrationOptions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Provider<any>;
