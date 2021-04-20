import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { CancellablePromise } from 'mobx/dist/internal';
import { sleep } from '@testing-tools';
import { IncrementValueAndSaveOptimistic } from './increment-value-and-save-optimistic.usecase';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { SaveCountSuccess } from '../../effects/save-count/save-count-success.effect';

describe(`${IncrementValueAndSaveOptimistic.name}`, () => {
    let store: CounterModel;
    let effect: SaveCountSuccess;
    let effectFlow: EffectFlow<number>;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new CounterStore({ $count: 3 });
        effectFlow = new EffectFlow();
        effect = new SaveCountSuccess(counterServiceMock, effectFlow);
    });
    it('increments model value on predefined amount and optimistically save to the BE', () => {
        jest.spyOn(store, 'increment');
        jest.spyOn(effect, 'execute');
        const useCase = new IncrementValueAndSaveOptimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(store.increment).toBeCalledTimes(1);
        expect(store.increment).toBeCalledWith(increaseAmount);
        expect(effect.execute).toBeCalledWith(store.$count);
    });
    it('decrements model value on predefined amount and if save to the BE failed', async () => {
        jest.spyOn(store, 'increment');
        jest.spyOn(store, 'decrement');
        jest.spyOn(effect, 'execute').mockImplementationOnce(
            () => Promise.reject('Error') as CancellablePromise<number>
        );
        const useCase = new IncrementValueAndSaveOptimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(store.increment).toBeCalledWith(increaseAmount);
        await sleep(0);
        expect(store.decrement).toBeCalledWith(increaseAmount);
    });
});
