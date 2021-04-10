import { Domain } from '../../../stores/domainStore/domainStore.types';
import { IncreaseValue } from './increase-value.usecase';

describe(`${IncreaseValue.name}`, () => {
    it('increases model value on predefined amount', () => {
        const model: Domain = {
            $count: 3,
            setCount: jest.fn()
        };
        const increaseAmount = 4;
        const useCase = new IncreaseValue(model, increaseAmount);
        useCase.execute();
        expect(model.setCount).toBeCalledTimes(1);
        expect(model.setCount).toBeCalledWith(7);
    });
});
