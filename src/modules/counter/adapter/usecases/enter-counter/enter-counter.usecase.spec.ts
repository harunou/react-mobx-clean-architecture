import { counterRemoteSourceServiceMock } from '@api/counterRemoteSource/counterRemoteSource.mocks';
import { CounterStore } from '@stores/domain/counter/counter.store';
import { CounterModel } from '@stores/domain/counter/counter.types';
import { act } from '@testing-library/react';
import { GetCountEffect } from '../../effects/get-count/get-count.effect';
import { EnterCounterUseCase } from './enter-counter.usecase';

describe(`${EnterCounterUseCase.name}`, () => {
    let store: CounterModel;
    let effect: GetCountEffect;
    beforeEach(() => {
        store = new CounterStore();
        effect = new GetCountEffect(counterRemoteSourceServiceMock);
    });
    it('fetches data from BE and inits store', async () => {
        jest.spyOn(effect, 'execute');
        jest.spyOn(store, 'setCount');
        const useCase = new EnterCounterUseCase(store, effect);

        await act(async () => useCase.execute());

        expect(effect.execute).toBeCalledTimes(1);
        expect(store.setCount).toBeCalledTimes(1);
        expect(store.setCount).toBeCalledWith(0);
    });
});
