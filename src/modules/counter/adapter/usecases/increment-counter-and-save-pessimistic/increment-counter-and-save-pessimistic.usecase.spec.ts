import { counterServiceMock } from '@api/counter.mocks';
import { CounterStore } from '@stores/counter/counter.store';
import { CounterModel } from '@stores/counter/counter.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { sleep } from '@testing-tools/testing-tools.helpers';
import { IncrementCount } from '../../effects/increment-count/increment-count.effect';
import { IncrementCounterAndSavePessimistic } from './increment-counter-and-save-pessimistic.usecase';

describe(`${IncrementCounterAndSavePessimistic.name}`, () => {
    let store: CounterModel;
    let effect: IncrementCount;
    let effectFlow: EffectFlow<number>;
    const increment = 5;
    const count = 4;
    beforeEach(() => {
        store = new CounterStore({ count$: count });
        effectFlow = new EffectFlow();
        effect = new IncrementCount(counterServiceMock, effectFlow);
    });
    it('pessimistically increment count on the BE and on success set store', async () => {
        jest.spyOn(effect, 'execute');
        jest.spyOn(store, 'setCount');
        const useCase = new IncrementCounterAndSavePessimistic(
            store,
            effect,
            increment
        );
        useCase.execute();
        expect(effect.execute).toBeCalledWith(increment);
        await sleep();
        expect(store.setCount).toBeCalledTimes(1);
        expect(store.setCount).toBeCalledWith(increment);
    });
});
