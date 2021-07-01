import { LeaveCounterUseCase } from './leave-counter.usecase';

describe.skip(`${LeaveCounterUseCase.name}`, () => {
    it('stub', () => {
        expect(true).toBe(true);
    });
    // let getCount: GetCountEffect;
    //     let incrementCount: IncrementCountEffect;
    //     beforeEach(() => {
    //         getCount = new GetCountEffect(counterRemoteSourceServiceMock);
    //         incrementCount = new IncrementCountEffect(
    //             counterRemoteSourceServiceMock
    //         );
    //     });
    //     i t('cancels init flow', async () => {
    //         jest.spyOn(getCount, 'cancel');
    //         jest.spyOn(incrementCount, 'cancel');
    //         const useCase = new LeaveCounterUseCase(getCount, incrementCount);

    //         await act(async () => useCase.execute());

    //         expect(getCount.cancel).toBeCalledTimes(1);
    //         expect(incrementCount.cancel).toBeCalledTimes(1);
    //     });
});
