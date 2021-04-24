import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { CancellablePromise } from 'mobx/dist/internal';
import { SaveCountSuccess } from '../effects/save-count-success.effect';
import { IncreaseValueAndSaveOptimistic } from './increase-value-and-save-optimistic.usecase';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { sleep } from '@testing-tools/testing-tools.helpers';

describe(`${IncreaseValueAndSaveOptimistic.name}`, () => {
    let store: CounterModel;
    let effect: SaveCountSuccess;
    let effectFlow: EffectFlow<number>;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new CounterStore({ $count: 3 });
        effectFlow = new EffectFlow();
        effect = new SaveCountSuccess(counterServiceMock, effectFlow);
    });
    it('increases model value on predefined amount and optimistically save to the BE', () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const saveSpy = jest.spyOn(effect, 'execute');
        const useCase = new IncreaseValueAndSaveOptimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
        expect(saveSpy).toBeCalledWith(7);
    });
    it('decreases model value on predefined amount and if save to the BE failed', async () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const saveSpy = jest
            .spyOn(effect, 'execute')
            .mockImplementationOnce(
                () => Promise.reject('Error') as CancellablePromise<number>
            );
        const useCase = new IncreaseValueAndSaveOptimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
        expect(saveSpy).toBeCalledWith(7);
        await sleep(0);
        expect(setCountSpy).toBeCalledWith(3);
    });
});
