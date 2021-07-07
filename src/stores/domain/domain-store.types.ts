import { CounterModel, CounterState } from './counter/counter-store.types';

export interface DomainState {
    counter: CounterState;
}

export interface DomainModel {
    counter: CounterModel;
}
