import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { sleep } from '@testing-tools';
import { SaveCountSuccess } from '../effects/save-count-success.effect';
import { IncreaseValueAndSavePessimistic } from './increase-value-and-save-pessimistic.usecase';

describe(`${IncreaseValueAndSavePessimistic.name}`, () => {
    let store: CounterModel;
    let effect: SaveCountSuccess;
    let effectFlow: EffectFlow<number>;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new CounterStore({ $count: 3 });
        effectFlow = new EffectFlow();
        effect = new SaveCountSuccess(counterServiceMock, effectFlow);
        jest.spyOn(effect, 'execute');
    });
    it('pessimistically save count to the BE and on success set store', async () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const useCase = new IncreaseValueAndSavePessimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(effect.execute).toBeCalledWith(7);
        await sleep(0);
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
    });
});
