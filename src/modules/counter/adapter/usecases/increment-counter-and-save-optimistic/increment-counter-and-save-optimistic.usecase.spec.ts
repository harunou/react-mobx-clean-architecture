import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { CancellablePromise } from 'mobx/dist/internal';
import { IncrementCounterAndSaveOptimistic } from './increment-counter-and-save-optimistic.usecase';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { SaveCount } from '../../effects/save-count/save-count.effect';
import { sleep } from '@testing-tools/testing-tools.helpers';

describe(`${IncrementCounterAndSaveOptimistic.name}`, () => {
    let store: CounterModel;
    let effect: SaveCount;
    let effectFlow: EffectFlow<number>;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new CounterStore({ $count: 3 });
        effectFlow = new EffectFlow();
        effect = new SaveCount(counterServiceMock, effectFlow);
    });
    it('increments model value on predefined amount and optimistically save to the BE', () => {
        jest.spyOn(store, 'increment');
        jest.spyOn(effect, 'execute');
        const useCase = new IncrementCounterAndSaveOptimistic(
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
        const useCase = new IncrementCounterAndSaveOptimistic(
            store,
            effect,
            increaseAmount
        );
        useCase.execute();
        expect(store.increment).toBeCalledWith(increaseAmount);
        await sleep();
        expect(store.decrement).toBeCalledWith(increaseAmount);
    });
});