export interface DomainState {
    $count: number;
}

export interface DomainLogic {
    setCount(v: number): void;
}

export type Domain = DomainState & DomainLogic;
