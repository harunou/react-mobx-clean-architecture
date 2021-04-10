import { DomainModel, DomainState } from '../domainStore/domainStore.types';
import { Builder, Selector, UseCase } from '../helpers/stores.types';
import { RootStore } from './appStore';

describe(`${RootStore.name}`, () => {
    it('has use case executer', () => {
        const model = {} as DomainModel;
        const store = new RootStore(model);
        const useCaseMock: UseCase = {
            execute: jest.fn()
        };
        const useCaseBuilderMock: Builder<DomainModel, UseCase> = {
            build: jest.fn().mockReturnValue(useCaseMock)
        };
        store.execute(useCaseBuilderMock);
        expect(useCaseBuilderMock.build).toBeCalledTimes(1);
        expect(useCaseBuilderMock.build).toBeCalledWith(model);
        expect(useCaseMock.execute).toBeCalledTimes(1);
    });
    it('has use query executer', () => {
        const model = {} as DomainModel;
        const store = new RootStore(model);
        const queryResult = 0;
        const selectMock: Selector = {
            result: queryResult
        };
        const selectBuilderMock: Builder<DomainModel, Selector> = {
            build: jest.fn().mockReturnValue(selectMock)
        };
        const query = store.query(selectBuilderMock);
        expect(selectBuilderMock.build).toBeCalledTimes(1);
        expect(selectBuilderMock.build).toBeCalledWith(model);
        expect(query.result).toEqual(queryResult);
    });
});
