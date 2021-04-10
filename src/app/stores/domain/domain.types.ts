export interface DomainState {
    $count: number;
}

export interface DomainLogic {
    setCount(v: number): void;
}

export type DomainModel = DomainState & DomainLogic;
