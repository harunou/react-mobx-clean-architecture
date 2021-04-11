import { counterServiceMock } from '../../../api/counter.mocks';
import { CounterStore } from '../../../stores/counter/counter.store';
import { CounterModel } from '../../../stores/counter/counter.types';
import { sleep } from '../../../testing-tools';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';
import { IncreaseValueAndSaveOptimistic } from './increase-value-and-save-optimistic.usecase';

describe(`${IncreaseValueAndSaveOptimistic.name}`, () => {
    let store: CounterModel;
    let effect: SaveCountSuccessEffect;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new CounterStore({ $count: 3 });
        effect = new SaveCountSuccessEffect(counterServiceMock);
        jest.spyOn(effect, 'save');
    });
    it('increases model value on predefined amount and optimistically save to the BE', () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const useCase = new IncreaseValueAndSaveOptimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
        expect(effect.save).toBeCalledWith(7);
    });
    it('decreases model value on predefined amount and if save to the BE failed', async () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const useCase = new IncreaseValueAndSaveOptimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
        expect(effect.save).toBeCalledWith(7);
        await sleep(0);
        expect(setCountSpy).toBeCalledWith(3);
    });
});
