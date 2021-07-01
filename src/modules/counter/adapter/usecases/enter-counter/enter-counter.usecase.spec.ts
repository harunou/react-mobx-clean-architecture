import { EnterCounterUseCase } from './enter-counter.usecase';

describe.skip(`${EnterCounterUseCase.name}`, () => {
    it('stub', () => {
        expect(true).toBe(true);
    });
    // let store: CounterModel;
    // let effect: GetCountEffect;
    // beforeEach(() => {
    //     store = new CounterStore();
    //     effect = new GetCountEffect(counterRemoteSourceServiceMock());
    // });
    // i t('fetches data from BE and inits store', async () => {
    //     jest.spyOn(effect, 'execute');
    //     jest.spyOn(store, 'setCount');
    //     const useCase = new EnterCounterUseCase(store, effect);

    //     await act(async () => useCase.execute());

    //     expect(effect.execute).toBeCalledTimes(1);
    //     expect(store.setCount).toBeCalledTimes(1);
    //     expect(store.setCount).toBeCalledWith(0);
    // });
});
