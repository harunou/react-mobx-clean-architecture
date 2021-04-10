import { DomainState } from '../../../stores/domainStore/domainStore.types';
import { Multiply } from './multiply.selector';

describe(`${Multiply.name}`, () => {
    it('selects $count value from domain store and multiply on predefined value', () => {
        const model: DomainState = {
            $count: 3
        };
        const multiplyAmount = 4;
        const select = new Multiply(model, multiplyAmount);
        expect(select.result).toEqual(12);
    });
});
