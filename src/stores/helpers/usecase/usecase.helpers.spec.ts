import { UseCaseBuilder } from './usecase.helpers';
import { UseCase, UseCaseConstructor } from './usecase.types';

interface CounterStateMock {
    $count: number;
}
interface PersistenceMock {
    setCount(): void;
}
type SetCountPropsMock = number;
type SetCountUseCaseClassMock = UseCaseConstructor<
    CounterStateMock,
    PersistenceMock,
    SetCountPropsMock
>;

describe(`${UseCaseBuilder.name}`, () => {
    let persistence: PersistenceMock;
    let SetCountUseCaseClassMock: SetCountUseCaseClassMock;
    let setCountUseCaseInstanceMock: UseCase;

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
    });
    it('calls make static method to build a usecase', () => {
        const builder = UseCaseBuilder.make(SetCountUseCaseClassMock);
        const store: CounterStateMock = {
            $count: 5
        };
        const useCase = builder.build(store, persistence);
        expect(SetCountUseCaseClassMock.make).toBeCalledTimes(1);
        expect(useCase).toEqual(setCountUseCaseInstanceMock);
    });
    it('builds usecase with store and persistence', () => {
        const builder = UseCaseBuilder.make(SetCountUseCaseClassMock);
        const store: CounterStateMock = {
            $count: 5
        };
        builder.build(store, persistence);
        expect(SetCountUseCaseClassMock.make).toBeCalledWith({
            store,
            persistence,
            props: undefined
        });
    });
    it('builds usecase with props, store and persistence', () => {
        const builder = UseCaseBuilder.make(SetCountUseCaseClassMock);
        const store: CounterStateMock = {
            $count: 5
        };
        const props: SetCountPropsMock = 3;
        builder.withProps(props).build(store, persistence);
        expect(SetCountUseCaseClassMock.make).toBeCalledWith({
            store,
            persistence,
            props
        });
    });
});
