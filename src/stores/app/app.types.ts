import { CounterModel, CounterState } from '../counter/counter.types';

export interface AppState {
    counter: CounterState;
}

export interface AppModel {
    counter: CounterModel;
}
