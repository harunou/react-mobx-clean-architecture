import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { IncreaseValue } from './increase-value.usecase';

describe(`${IncreaseValue.name}`, () => {
    it('increases model value on predefined amount', () => {
        const initialState = 3;
        const increaseAmount = 4;
        const model: CounterModel = new CounterStore({ $count: 3 });
        const setCountSpy = jest.spyOn(model, 'setCount');
        const useCase = new IncreaseValue(model, increaseAmount);
        useCase.execute();
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(initialState + increaseAmount);
    });
});
