import { Store } from './store.helpers';
import {
    Selector,
    SelectorInteractionBuilder,
    UseCase,
    UseCaseInteractionBuilder
} from './store.types';

interface State {
    $value: number;
}
interface Model extends State {
    setValue(v: number): void;
}
interface Persistence {
    fetchValue(): Promise<number>;
}
class RootStore extends Store<Model, Persistence> {}

describe(`${RootStore.name} that extends Store helper`, () => {
    let rootStore: RootStore;
    let model: Model;
    let persistence: Persistence;

    let queryResult: number;
    let selector: Selector<number>;
    let selectorBuilder: SelectorInteractionBuilder<Model, Selector<number>>;

    let useCase: UseCase;
    let useCaseBuilder: UseCaseInteractionBuilder<Model, Persistence>;

    beforeEach(() => {
        model = {
            $value: 0,
            setValue: jest.fn()
        };
        persistence = {
            fetchValue: jest.fn()
        };
        rootStore = new RootStore(model, persistence);

        queryResult = 3;
        selector = {
            result: queryResult
        };
        selectorBuilder = {
            build: jest.fn().mockReturnValue(selector)
        };

        useCase = {
            execute: jest.fn()
        };
        useCaseBuilder = {
            build: jest.fn().mockReturnValue(useCase)
        };
    });
    it('has query executer that builds selector and pass model', () => {
        rootStore.query(selectorBuilder);
        expect(selectorBuilder.build).toBeCalledTimes(1);
        expect(selectorBuilder.build).toBeCalledWith(model);
    });
    it('has query executer that builds selector and the selector with the selected value', () => {
        const result = rootStore.query(selectorBuilder).result;
        expect(result).toEqual(queryResult);
    });
    it('has usecase executer that builds usecase once and pass model and persistence', () => {
        rootStore.execute(useCaseBuilder);
        expect(useCaseBuilder.build).toBeCalledTimes(1);
        expect(useCaseBuilder.build).toBeCalledWith(model, persistence);
    });
    it('has usecase executer that builds usecase and runs execute method once', () => {
        rootStore.execute(useCaseBuilder);
        expect(useCase.execute).toBeCalledTimes(1);
    });
});
