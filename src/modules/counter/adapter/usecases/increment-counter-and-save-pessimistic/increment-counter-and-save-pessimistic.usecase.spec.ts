import { counterRemoteSourceServiceMock } from '@api/counterRemoteSource/counterRemoteSource.mocks';
import { CounterStore } from '@stores/domain/counter/counter.store';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { act } from '@testing-library/react';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';
import { IncrementCounterAndSavePessimisticUseCase } from './increment-counter-and-save-pessimistic.usecase';

describe(`${IncrementCounterAndSavePessimisticUseCase.name}`, () => {
    let store: CounterModel;
    let effect: IncrementCountEffect;
    const increment = 5;
    const count = 4;
    beforeEach(() => {
        store = new CounterStore({ count$: count });
        effect = new IncrementCountEffect(counterRemoteSourceServiceMock);
    });
    it('pessimistically increment count on the BE and on success set store', async () => {
        jest.spyOn(effect, 'execute');
        jest.spyOn(store, 'setCount');
        const useCase = new IncrementCounterAndSavePessimisticUseCase(
            store,
            effect
        );

        await act(async () => useCase.execute(increment));

        expect(effect.execute).toBeCalledWith(increment);
        expect(store.setCount).toBeCalledTimes(1);
        expect(store.setCount).toBeCalledWith(increment);
    });
});
