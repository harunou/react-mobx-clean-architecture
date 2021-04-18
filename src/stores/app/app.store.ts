import { CounterStore } from '../counter/counter.store';
import { CounterModel } from '../counter/counter.types';
import { AppModel, AppState } from './app.types';

export class AppStore implements AppModel {
    static make(state: AppState): AppStore {
        const counter = new CounterStore(state.counter);
        return new AppStore(counter);
    }

    constructor(public counter: CounterModel) {}
}
