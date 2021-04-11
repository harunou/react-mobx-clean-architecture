import { DomainStore } from '../../../stores/domain/domain.store';
import { Domain } from '../../../stores/domain/domain.types';
import { makeAsyncRequest, sleep } from '../../../testing-tools';
import { SaveCountSuccessEffect } from '../effects/save-count-success.effect';
import { IncreaseValueAndSavePessimistic } from './increase-value-and-save-pessimistic.usecases';

describe(`${IncreaseValueAndSavePessimistic.name}`, () => {
    let store: Domain;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new DomainStore({ $count: 3 });
    });
    it('pessimistically save count to the BE and on success set store', async () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const flow = ({
            save: jest
                .fn()
                .mockImplementationOnce((v: number) => makeAsyncRequest(0, v))
        } as unknown) as SaveCountSuccessEffect;
        const useCase = new IncreaseValueAndSavePessimistic(
            store,
            flow,
            increaseAmount
        );
        useCase.execute();
        expect(flow.save).toBeCalledWith(7);
        await sleep(0);
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
    });
});
