import { computed, makeObservable } from 'mobx';
import { SelectorInteractionBuilder } from './selector.helpers';
import { Selector, SelectorMakeParams } from './selector.types';

interface MockAccountState {
    balance: number;
}
type MockGetBalanceProp = number;
type MockSelectorParams<P> = SelectorMakeParams<MockAccountState, P>;

class MockGetBalance implements Selector {
    static make({
        store,
        props
    }: MockSelectorParams<MockGetBalanceProp>): MockGetBalance {
        return new MockGetBalance(store, props);
    }

    constructor(
        private readonly store: MockAccountState,
        private readonly factor: MockGetBalanceProp = 1
    ) {
        makeObservable(this, {
            result: computed
        });
    }

    get result(): number {
        return this.store.balance * this.factor;
    }
}

describe(`${SelectorInteractionBuilder.name}`, () => {
    it('builds selector', () => {
        const mockGetBalanceSelector = SelectorInteractionBuilder.make(
            MockGetBalance
        );
        const store: MockAccountState = {
            balance: 5
        };
        const selectorBuilt = mockGetBalanceSelector.build(store);
        expect(selectorBuilt).toBeInstanceOf(MockGetBalance);
    });
    it('builds selector with store', () => {
        const mockGetBalanceSelector = SelectorInteractionBuilder.make(
            MockGetBalance
        );
        const store: MockAccountState = {
            balance: 5
        };
        const selectorConstructed = new MockGetBalance(store);
        const selectorBuilt = mockGetBalanceSelector.build(store);
        expect(selectorBuilt.result).toEqual(selectorConstructed.result);
    });
    it('builds selector with store and props', () => {
        const mockGetBalanceSelector = SelectorInteractionBuilder.make(
            MockGetBalance
        );
        const store: MockAccountState = {
            balance: 5
        };
        const props: MockGetBalanceProp = 3;
        const selectorConstructed = new MockGetBalance(store);
        const selectorBuilt = mockGetBalanceSelector.build(store);
        expect(selectorBuilt.result).toEqual(selectorConstructed.result);
    });
});
