import { counterRemoteSourceServiceMock } from '@api/counterRemoteSource/counterRemoteSource.mocks';
import { act } from '@testing-library/react';
import { GetCountEffect } from '../../effects/get-count/get-count.effect';
import { IncrementCountEffect } from '../../effects/increment-count/increment-count.effect';
import { LeaveCounterUseCase } from './leave-counter.usecase';

describe.skip(`${LeaveCounterUseCase.name}`, () => {
    let getCount: GetCountEffect;
    let incrementCount: IncrementCountEffect;
    beforeEach(() => {
        getCount = new GetCountEffect(counterRemoteSourceServiceMock);
        incrementCount = new IncrementCountEffect(
            counterRemoteSourceServiceMock
        );
    });
    it('cancels init flow', async () => {
        jest.spyOn(getCount, 'cancel');
        jest.spyOn(incrementCount, 'cancel');
        const useCase = new LeaveCounterUseCase(getCount, incrementCount);

        await act(async () => useCase.execute());

        expect(getCount.cancel).toBeCalledTimes(1);
        expect(incrementCount.cancel).toBeCalledTimes(1);
    });
});
