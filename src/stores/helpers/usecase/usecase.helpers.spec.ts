import { UseCaseBuilder } from './usecase.helpers';
import { UseCase, UseCaseConstructor } from './usecase.types';

interface CounterState {
    $count: number;
}
interface Persistence {
    setCount(): void;
}
type SetCountProps = string;
type SetCountUseCaseConstructor = UseCaseConstructor<
    CounterState,
    Persistence,
    SetCountProps
>;
type GetCountUseCaseBuilder = UseCaseBuilder<CounterState, Persistence, string>;

describe(`${UseCaseBuilder.name}`, () => {
    let SetCountUseCaseClassMock: SetCountUseCaseConstructor;
    let setCountUseCaseInstanceMock: UseCase;
    let persistence: Persistence;
    let store: CounterState;
    let builder: GetCountUseCaseBuilder;

    beforeEach(() => {
        persistence = {
            setCount: jest.fn()
        };
        setCountUseCaseInstanceMock = {
            execute: jest.fn()
        };
        SetCountUseCaseClassMock = {
            make: jest.fn().mockReturnValueOnce(setCountUseCaseInstanceMock)
        };
        store = {
            $count: 5
        };
        builder = UseCaseBuilder.make(SetCountUseCaseClassMock);
    });
    it('calls make static method to build a usecase', () => {
        const useCase = builder.build(store, persistence);
        expect(SetCountUseCaseClassMock.make).toBeCalledTimes(1);
        expect(useCase).toEqual(setCountUseCaseInstanceMock);
    });
    it('builds usecase with a store and a persistence', () => {
        builder.build(store, persistence);
        expect(SetCountUseCaseClassMock.make).toBeCalledWith({
            store,
            persistence,
            props: undefined
        });
    });
    it('builds usecase with props, a store and a persistence', () => {
        const props: SetCountProps = 'props';
        builder.withProps(props).build(store, persistence);
        expect(SetCountUseCaseClassMock.make).toBeCalledWith({
            store,
            persistence,
            props
        });
    });
});
