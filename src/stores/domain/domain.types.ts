import { CounterModel, CounterState } from '../counter/counter.types';

export interface DomainState {
    counter: CounterState;
}

export interface DomainModel {
    counter: CounterModel;
}
