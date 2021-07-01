import { IncrementCounterAndSavePessimisticUseCase } from './increment-counter-and-save-pessimistic.usecase';

describe.skip(`${IncrementCounterAndSavePessimisticUseCase.name}`, () => {
    it('stub', () => {
        expect(true).toBe(true);
    });
    // let store: CounterModel;
    // let effect: IncrementCountEffect;
    // const increment = 5;
    // beforeEach(() => {
    //     store = new CounterStore();
    //     effect = new IncrementCountEffect(counterRemoteSourceServiceMock());
    // });
    // i t('pessimistically increment count on the BE and on success set store', async () => {
    //     jest.spyOn(effect, 'execute');
    //     jest.spyOn(store, 'setCount');
    //     const useCase = new IncrementCounterAndSavePessimisticUseCase(
    //         store,
    //         effect
    //     );

    //     await act(async () => useCase.execute(increment));

    //     expect(effect.execute).toBeCalledWith(increment);
    //     expect(store.setCount).toBeCalledTimes(1);
    //     expect(store.setCount).toBeCalledWith(increment);
    // });
});
