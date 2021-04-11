import { DomainState } from '../../../stores/domain/domain.types';
import { MultiplyCount } from './multiply-count.selector';

describe(`${MultiplyCount.name}`, () => {
    it('selects $count value from domain store and multiply on predefined value', () => {
        const model: DomainState = {
            $count: 3
        };
        const multiplyAmount = 4;
        const select = new MultiplyCount(model, multiplyAmount);
        expect(select.result).toEqual(12);
    });
});
