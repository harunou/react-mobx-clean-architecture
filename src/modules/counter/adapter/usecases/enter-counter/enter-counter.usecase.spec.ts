import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { sleep } from '@testing-tools/testing-tools.helpers';
import { GetCountEffect } from '../../effects/get-count/get-count.effect';
import { EnterCounterUseCase } from './enter-counter.usecase';

describe(`${EnterCounterUseCase.name}`, () => {
    let store: CounterModel;
    let effect: GetCountEffect;
    let effectFlow: EffectFlow<number>;
    const count = 4;
    beforeEach(() => {
        store = new CounterStore({ count$: count });
        effectFlow = new EffectFlow();
        effect = new GetCountEffect(counterServiceMock, effectFlow);
    });
    it('fetches data from BE and inits store', async () => {
        jest.spyOn(effect, 'execute');
        jest.spyOn(store, 'setCount');
        const useCase = new EnterCounterUseCase(store, effect);
        useCase.execute();
        expect(effect.execute).toBeCalledTimes(1);
        await sleep();
        expect(store.setCount).toBeCalledTimes(1);
        expect(store.setCount).toBeCalledWith(0);
    });
});
