import { SelectorInteractionBuilder } from './selector.helpers';
import {
    Selector,
    SelectorConstructor,
    SelectorMakeParams
} from './selector.types';

interface MockAccountState {
    balance: number;
}
type MockGetBalanceProps = number;
type MockSelectorParams<P> = SelectorMakeParams<MockAccountState, P>;
type MockSelectorConstructor = SelectorConstructor<
    MockAccountState,
    MockGetBalanceProps,
    MockSelectorParams<MockGetBalanceProps>
>;

describe(`${SelectorInteractionBuilder.name}`, () => {
    let GetBalanceClass: MockSelectorConstructor;
    let getBalanceSelectorMock: Selector;

    beforeEach(() => {
        getBalanceSelectorMock = {
            result: 3
        };
        GetBalanceClass = {
            make: jest.fn().mockReturnValueOnce(getBalanceSelectorMock)
        };
    });
    it('calls make static method to build selector', () => {
        const getBalanceSelectorBuilder = SelectorInteractionBuilder.make(
            GetBalanceClass
        );
        const store: MockAccountState = {
            balance: 5
        };
        const selector = getBalanceSelectorBuilder.build(store);
        expect(GetBalanceClass.make).toBeCalledTimes(1);
        expect(selector).toEqual(getBalanceSelectorMock);
    });
    it('builds selector with store', () => {
        const getBalanceSelectorBuilder = SelectorInteractionBuilder.make(
            GetBalanceClass
        );
        const store: MockAccountState = {
            balance: 5
        };
        getBalanceSelectorBuilder.build(store);
        expect(GetBalanceClass.make).toBeCalledWith({
            store,
            props: undefined
        });
    });
    it('builds selector with props and store', () => {
        const getBalanceSelectorBuilder = SelectorInteractionBuilder.make(
            GetBalanceClass
        );
        const store: MockAccountState = {
            balance: 5
        };
        const props: MockGetBalanceProps = 3;
        getBalanceSelectorBuilder.withProps(props).build(store);
        expect(GetBalanceClass.make).toBeCalledWith({
            store,
            props
        });
    });
});
