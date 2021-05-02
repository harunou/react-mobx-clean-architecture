import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { sleep } from '@testing-tools/testing-tools.helpers';
import { GetCount } from '../../effects/get-count/get-count.effect';
import { InitCounter } from './init-counter.usecase';

describe(`${InitCounter.name}`, () => {
    let store: CounterModel;
    let effect: GetCount;
    let effectFlow: EffectFlow<number>;
    const count = 4;
    beforeEach(() => {
        store = new CounterStore({ $count: count });
        effectFlow = new EffectFlow();
        effect = new GetCount(counterServiceMock, effectFlow);
    });
    it('fetches data from BE and inits store', async () => {
        jest.spyOn(effect, 'execute');
        jest.spyOn(store, 'setCount');
        const useCase = new InitCounter(store, effect);
        useCase.execute();
        expect(effect.execute).toBeCalledTimes(1);
        await sleep();
        expect(store.setCount).toBeCalledTimes(1);
        expect(store.setCount).toBeCalledWith(0);
    });
});
