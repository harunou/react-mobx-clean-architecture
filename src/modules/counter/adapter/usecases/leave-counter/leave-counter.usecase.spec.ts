import { counterServiceMock } from '@api/counter.mocks';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { sleep } from '@testing-tools/testing-tools.helpers';
import { GetCount } from '../../effects/get-count/get-count.effect';
import { IncrementCount } from '../../effects/increment-count/increment-count.effect';
import { LeaveCounter } from './leave-counter.usecase';

describe(`${LeaveCounter.name}`, () => {
    let getCount: GetCount;
    let incrementCount: IncrementCount;
    let effectFlow: EffectFlow<number>;
    beforeEach(() => {
        effectFlow = new EffectFlow();
        getCount = new GetCount(counterServiceMock, effectFlow);
        incrementCount = new IncrementCount(counterServiceMock, effectFlow);
    });
    it('cancels init flow', async () => {
        jest.spyOn(getCount, 'cancel');
        jest.spyOn(incrementCount, 'cancel');
        const useCase = new LeaveCounter(getCount, incrementCount);
        useCase.execute();
        expect(getCount.cancel).toBeCalledTimes(1);
        expect(incrementCount.cancel).toBeCalledTimes(1);
        await sleep();
    });
});
