import { CounterStore } from '@stores/domain/counter/counter.store';
import { IncrementCounterUseCase } from './increment-counter.usecase';

describe(`${IncrementCounterUseCase.name}`, () => {
    it('increments model value on a predefined amount', () => {
        const increaseAmount = 4;
        const model = new CounterStore();
        jest.spyOn(model, 'increment');
        const useCase = new IncrementCounterUseCase(model);
        useCase.execute(increaseAmount);
        expect(model.increment).toBeCalledTimes(1);
        expect(model.increment).toBeCalledWith(increaseAmount);
    });
});
