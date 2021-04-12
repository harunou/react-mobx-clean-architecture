import { counterServiceMock } from '../../../api/counter.mocks';
import { CounterDataSource } from '../../../api/counter.types';
import { SaveCountSuccessEffect } from './save-count-success.effect';

describe(`${SaveCountSuccessEffect.name}`, () => {
    it('saves data to the BE', async () => {
        const value = 5;
        const dataSource: CounterDataSource = counterServiceMock;
        const effect = new SaveCountSuccessEffect(dataSource);
        await expect(effect.save(value)).resolves.toEqual(value);
    });
});
