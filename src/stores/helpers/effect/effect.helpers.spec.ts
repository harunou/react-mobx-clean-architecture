import { EffectBuilder } from './effect.helpers';
import { Effect, EffectConstructor } from './effect.types';

interface CounterState {
    $count: number;
}
interface Persistence {
    getCount(): void;
}
type GetCountEffectProps = number;
type GetCountEffectResult = number;
type GetCountEffectConstructor = EffectConstructor<
    CounterState,
    Persistence,
    GetCountEffectProps,
    GetCountEffectResult
>;
type GetCountEffectBuilder = EffectBuilder<
    CounterState,
    Persistence,
    GetCountEffectProps,
    GetCountEffectResult
>;

describe(`${EffectBuilder.name}`, () => {
    let GetCountEffectClassMock: GetCountEffectConstructor;
    let getCountEffectInstanceMock: Effect<number>;
    let persistence: Persistence;
    let store: CounterState;
    let builder: GetCountEffectBuilder;
    beforeEach(() => {
        persistence = {
            getCount: jest.fn()
        };
        getCountEffectInstanceMock = {
            execute: jest.fn()
        };
        GetCountEffectClassMock = {
            make: jest.fn().mockReturnValueOnce(getCountEffectInstanceMock)
        };
        store = {
            $count: 5
        };
        builder = EffectBuilder.make(GetCountEffectClassMock);
    });
    it('builds singleton effect', () => {
        builder.build(store, persistence);
        builder.build(store, persistence);
        expect(GetCountEffectClassMock.make).toBeCalledTimes(1);
    });
    it('builds new effect if singleton param set to false', () => {
        builder.build(store, persistence, false);
        builder.build(store, persistence, false);
        expect(GetCountEffectClassMock.make).toBeCalledTimes(2);
    });
    it('calls make static method to build an effect', () => {
        const effect = builder.build(store, persistence);
        expect(GetCountEffectClassMock.make).toBeCalledTimes(1);
        expect(effect).toEqual(getCountEffectInstanceMock);
    });
    it('builds effect with a store and a persistence', () => {
        builder.build(store, persistence);
        expect(GetCountEffectClassMock.make).toBeCalledWith({
            store,
            persistence
        });
    });
});
