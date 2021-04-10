import { CountService } from '../../../api/count.service';
import { SaveCountSuccessFlow } from './feature.flows';

describe(`${SaveCountSuccessFlow.name}`, () => {
    it('saves data to the BE', async () => {
        const value = 5;
        const service: CountService = {
            saveSuccess: jest.fn().mockResolvedValueOnce(value),
            saveFailure: jest.fn().mockRejectedValueOnce('Error')
        };
        const flow = new SaveCountSuccessFlow(service);
        await expect(flow.save(value)).resolves.toEqual(value);
    });
});
