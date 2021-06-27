import { counterRemoteSourceServiceMock } from '@api/counterRemoteSource/counterRemoteSource.mocks';
import { CounterStore } from '@stores/domain/counter/counter.store';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { IncrementCounterAndSaveOptimisticUseCase } from './increment-counter-and-save-optimistic.usecase';
import { SaveCountEffect } from '../../effects/save-count/save-count.effect';
import { runInAction } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { act } from '@testing-library/react';

describe(`${IncrementCounterAndSaveOptimisticUseCase.name}`, () => {
    let store: CounterModel;
    let effect: SaveCountEffect;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new CounterStore();
        effect = new SaveCountEffect(counterRemoteSourceServiceMock);
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

        await act(async () => useCase.execute(increaseAmount));

        expect(store.increment).toBeCalledWith(increaseAmount);
        expect(store.decrement).toBeCalledWith(increaseAmount);
    });
});
