import { CounterService } from '../../../api/counter.service';
import { SaveCountSuccessEffect } from './save-count-success.effect';

describe(`${SaveCountSuccessEffect.name}`, () => {
    it('saves data to the BE', async () => {
        const value = 5;
        const service: CounterService = {
            saveSuccess: jest.fn().mockResolvedValueOnce(value),
            saveFailure: jest.fn().mockRejectedValueOnce('Error')
        };
        const flow = new SaveCountSuccessEffect(service);
        await expect(flow.save(value)).resolves.toEqual(value);
    });
});
