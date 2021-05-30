import { COUNTER_MODEL } from '@stores/counter/counter.store';
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
    constructor(@inject(COUNTER_MODEL) public counter: CounterModel) {}
}

export const APP_MODEL: InjectionToken<AppModel> = Symbol('APP_MODEL');

container.register(
    APP_MODEL,
    { useClass: AppStore },
    { lifecycle: Lifecycle.Singleton }
);
