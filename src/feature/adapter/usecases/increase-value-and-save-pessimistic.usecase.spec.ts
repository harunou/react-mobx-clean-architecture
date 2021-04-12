import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { sleep } from '@testing-tools';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';
import { IncreaseValueAndSavePessimistic } from './increase-value-and-save-pessimistic.usecase';

describe(`${IncreaseValueAndSavePessimistic.name}`, () => {
    let store: CounterModel;
    let effect: SaveCountSuccessEffect;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new CounterStore({ $count: 3 });
        effect = new SaveCountSuccessEffect(counterServiceMock);
        jest.spyOn(effect, 'save');
    });
    it('pessimistically save count to the BE and on success set store', async () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const useCase = new IncreaseValueAndSavePessimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(effect.save).toBeCalledWith(7);
        await sleep(0);
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
    });
});
