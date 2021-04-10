import { DomainModel } from '../stores/domainStore/domainStore.types';
import { IncreaseValue } from './feature.usecases';

describe(`${IncreaseValue.name}`, () => {
    it('increases model value on predefined amount', () => {
        const model: DomainModel = {
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
