import { CounterStore } from '@stores/counter/counter.store';
import { IncrementCounter } from './increment-counter.usecase';

describe(`${IncrementCounter.name}`, () => {
    it('increments model value on a predefined amount', () => {
        const initialState = 3;
        const increaseAmount = 4;
        const model = new CounterStore({ $count: initialState });
        jest.spyOn(model, 'increment');
        const useCase = new IncrementCounter(model, increaseAmount);
        useCase.execute();
        expect(model.increment).toBeCalledTimes(1);
        expect(model.increment).toBeCalledWith(increaseAmount);
    });
});