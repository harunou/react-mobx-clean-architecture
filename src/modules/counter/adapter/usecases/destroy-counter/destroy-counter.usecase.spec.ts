import { counterServiceMock } from '@api/counter.mocks';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { sleep } from '@testing-tools/testing-tools.helpers';
import { GetCount } from '../../effects/get-count/get-count.effect';
import { DestroyCounter } from './destroy-counter.usecase';

describe(`${DestroyCounter.name}`, () => {
    let effect: GetCount;
    let effectFlow: EffectFlow<number>;
    beforeEach(() => {
        effectFlow = new EffectFlow();
        effect = new GetCount(counterServiceMock, effectFlow);
    });
    it('cancels init flow', async () => {
        jest.spyOn(effect, 'cancel');
        const useCase = new DestroyCounter(effect);
        useCase.execute();
        expect(effect.cancel).toBeCalledTimes(1);
        await sleep();
    });
});
