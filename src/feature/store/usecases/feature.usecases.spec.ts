import { DomainStore } from '../../../stores/domainStore/domainStore';
import { DomainModel } from '../../../stores/domainStore/domainStore.types';
import {
    makeAsyncRequest,
    makeAsyncThrow,
    sleep
} from '../../../testing-tools';
import { SaveCountSuccessFlow } from '../flows/feature.flows';
import {
    IncreaseValue,
    IncreaseValueAndSaveOptimistic
} from './feature.usecases';

describe(`${IncreaseValue.name}`, () => {
    it('increases model value on predefined amount', () => {
        const model: DomainModel = {
            $count: 3,
            setCount: jest.fn()
        };
        const increaseAmount = 4;
        const useCase = new IncreaseValue(model, increaseAmount);
        useCase.execute();
        expect(model.setCount).toBeCalledTimes(1);
        expect(model.setCount).toBeCalledWith(7);
    });
});

describe(`${IncreaseValueAndSaveOptimistic.name}`, () => {
    let store: DomainModel;
    const increaseAmount = 4;
    beforeEach(() => {
        store = new DomainStore({ $count: 3 });
    });
    it('increases model value on predefined amount and optimistically save to the BE', () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const flow = ({
            save: jest
                .fn()
                .mockImplementationOnce((v: number) => makeAsyncRequest(0, v))
        } as unknown) as SaveCountSuccessFlow;
        const useCase = new IncreaseValueAndSaveOptimistic(
            store,
            flow,
            increaseAmount
        );
        useCase.execute();
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
        expect(flow.save).toBeCalledWith(7);
    });
    it.only('decreases model value on predefined amount and if save to the BE failed', async () => {
        const setCountSpy = jest.spyOn(store, 'setCount');
        const flow = ({
            save: jest
                .fn()
                .mockImplementationOnce((v: number) =>
                    makeAsyncThrow(0, 'Error')
                )
        } as unknown) as SaveCountSuccessFlow;
        const useCase = new IncreaseValueAndSaveOptimistic(
            store,
            flow,
            increaseAmount
        );
        useCase.execute();
        expect(setCountSpy).toBeCalledTimes(1);
        expect(setCountSpy).toBeCalledWith(7);
        expect(flow.save).toBeCalledWith(7);
        await sleep(0);
        expect(setCountSpy).toBeCalledWith(3);
    });
});
