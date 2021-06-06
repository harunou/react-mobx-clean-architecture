import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/domain/counter/counter.store';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { IncrementCounterAndSaveOptimisticUseCase } from './increment-counter-and-save-optimistic.usecase';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { SaveCountEffect } from '../../effects/save-count/save-count.effect';
import { sleep } from '@testing-tools/testing-tools.helpers';
import { runInAction } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';

describe(`${IncrementCounterAndSaveOptimisticUseCase.name}`, () => {
    let store: CounterModel;
    let effect: SaveCountEffect;
    let effectFlow: EffectFlow<number>;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new CounterStore({ count$: 3 });
        effectFlow = new EffectFlow();
        effect = new SaveCountEffect(counterServiceMock, effectFlow);
    });
    it('increments model value on predefined amount and optimistically save to the BE', () => {
        jest.spyOn(store, 'increment');
        jest.spyOn(effect, 'execute');
        const useCase = new IncrementCounterAndSaveOptimisticUseCase(
            store,
            effect
        );
        useCase.execute(increaseAmount);
        expect(store.increment).toBeCalledTimes(1);
        expect(store.increment).toBeCalledWith(increaseAmount);
        runInAction(() => {
            expect(effect.execute).toBeCalledWith(store.count$);
        });
    });
    it('decrements model value on predefined amount and if save to the BE failed', async () => {
        jest.spyOn(store, 'increment');
        jest.spyOn(store, 'decrement');
        jest.spyOn(effect, 'execute').mockImplementationOnce(
            () => Promise.reject('Error') as CancellablePromise<number>
        );
        const useCase = new IncrementCounterAndSaveOptimisticUseCase(
            store,
            effect
        );
        useCase.execute(increaseAmount);
        expect(store.increment).toBeCalledWith(increaseAmount);
        await sleep();
        expect(store.decrement).toBeCalledWith(increaseAmount);
    });
});
