import { COUNTER_STORE } from '@stores/counter/counter.store';
import {
    container,
    inject,
    injectable,
    InjectionToken,
    Lifecycle
} from 'tsyringe';
import { CounterModel } from '../counter/counter.types';
import { AppModel } from './app.types';

@injectable()
export class AppStore implements AppModel {
    constructor(@inject(COUNTER_STORE) public counter: CounterModel) {}
}

export const APP_STORE: InjectionToken<AppStore> = Symbol('APP_STORE');

container.register(
    APP_STORE,
    { useClass: AppStore },
    { lifecycle: Lifecycle.Singleton }
);
