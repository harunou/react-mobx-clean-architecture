import { counterServiceMock } from '@api/counter.mocks';
import { CounterDataSource } from '@api/counter.types';
import { SaveCountSuccess } from './save-count-success.effect';

describe(`${SaveCountSuccess.name}`, () => {
    it('saves data to the BE', async () => {
        const value = 5;
        const dataSource: CounterDataSource = counterServiceMock;
        const effect = new SaveCountSuccess(dataSource);
        await expect(effect.execute(value)).resolves.toEqual(value);
    });
});
