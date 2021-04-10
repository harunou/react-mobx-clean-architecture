import { DomainModel } from '../domainStore/domainStore.types';
import {
    Selector,
    SelectorBuilder,
    UseCase,
    UseCaseBuilder
} from '../helpers/stores.types';
import { PersistenceModel } from '../persistenceStore/persistenceStore.types';
import { AppStore } from './appStore';
import { StoreFacade } from './appStore.types';

describe(`${AppStore.name}`, () => {
    let model: DomainModel;
    let persistence: PersistenceModel;
    let store: StoreFacade<DomainModel, PersistenceModel>;

    beforeEach(() => {
        model = {} as DomainModel;
        persistence = {} as PersistenceModel;
        store = new AppStore(model, persistence);
    });

    it('has use case executer', () => {
        const useCaseMock: UseCase = {
            execute: jest.fn()
        };
        const useCaseBuilderMock: UseCaseBuilder<
            DomainModel,
            PersistenceModel
        > = {
            build: jest.fn().mockReturnValue(useCaseMock)
        };
        store.execute(useCaseBuilderMock);
        expect(useCaseBuilderMock.build).toBeCalledTimes(1);
        expect(useCaseBuilderMock.build).toBeCalledWith(model, persistence);
        expect(useCaseMock.execute).toBeCalledTimes(1);
    });
    it('has use query executer', () => {
        const queryResult = 0;
        const selectMock: Selector = {
            result: queryResult
        };
        const selectBuilderMock: SelectorBuilder<DomainModel> = {
            build: jest.fn().mockReturnValue(selectMock)
        };
        const query = store.query(selectBuilderMock);
        expect(selectBuilderMock.build).toBeCalledTimes(1);
        expect(selectBuilderMock.build).toBeCalledWith(model);
        expect(query.result).toEqual(queryResult);
    });
});
