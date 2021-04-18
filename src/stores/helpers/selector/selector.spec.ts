import { Selector } from '../store/store.types';
import { SelectorBuilder } from './selector.helpers';
import { SelectorConstructor } from './selector.types';

interface CounterState {
    $count: number;
}
type GetCountProps = string;
type GetCountSelectorResult = number;
type GetCountSelectorConstructor = SelectorConstructor<
    CounterState,
    GetCountProps,
    GetCountSelectorResult
>;
type GetCountSelectorBuilder = SelectorBuilder<
    CounterState,
    GetCountProps,
    GetCountSelectorResult
>;

describe(`${SelectorBuilder.name}`, () => {
    let GetCountSelectorClassMock: GetCountSelectorConstructor;
    let getCountSelectorInstanceMock: Selector;
    let store: CounterState;
    let builder: GetCountSelectorBuilder;

    beforeEach(() => {
        getCountSelectorInstanceMock = {
            result: 3
        };
        GetCountSelectorClassMock = {
            make: jest.fn().mockReturnValueOnce(getCountSelectorInstanceMock)
        };
        store = {
            $count: 5
        };
        builder = SelectorBuilder.make(GetCountSelectorClassMock);
    });
    it('calls make static method to build a selector', () => {
        const selector = builder.build(store);
        expect(GetCountSelectorClassMock.make).toBeCalledTimes(1);
        expect(selector).toEqual(getCountSelectorInstanceMock);
    });
    it('builds selector with a store', () => {
        builder.build(store);
        expect(GetCountSelectorClassMock.make).toBeCalledWith({
            store,
            props: undefined
        });
    });
    it('builds selector with props and a store', () => {
        const props: GetCountProps = 'props';
        builder.withProps(props).build(store);
        expect(GetCountSelectorClassMock.make).toBeCalledWith({
            store,
            props
        });
    });
});
