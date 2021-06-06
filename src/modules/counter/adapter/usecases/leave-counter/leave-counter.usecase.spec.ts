import { counterServiceMock } from '@api/counter.mocks';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { sleep } from '@testing-tools/testing-tools.helpers';
import { GetCountEffect } from '../../effects/get-count/get-count.effect';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';
import { LeaveCounterUseCase } from './leave-counter.usecase';

describe(`${LeaveCounterUseCase.name}`, () => {
    let getCount: GetCountEffect;
    let incrementCount: IncrementCountEffect;
    let effectFlow: EffectFlow<number>;
    beforeEach(() => {
        effectFlow = new EffectFlow();
        getCount = new GetCountEffect(counterServiceMock, effectFlow);
        incrementCount = new IncrementCountEffect(
            counterServiceMock,
            effectFlow
        );
    });
    it('cancels init flow', async () => {
        jest.spyOn(getCount, 'cancel');
        jest.spyOn(incrementCount, 'cancel');
        const useCase = new LeaveCounterUseCase(getCount, incrementCount);
        useCase.execute();
        expect(getCount.cancel).toBeCalledTimes(1);
        expect(incrementCount.cancel).toBeCalledTimes(1);
        await sleep();
    });
});
