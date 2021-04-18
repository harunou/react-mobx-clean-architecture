import { counterServiceMock } from '@api/counter.mocks';
import { CounterDataSource } from '@api/counter.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { SaveCountSuccess } from './save-count-success.effect';

describe(`${SaveCountSuccess.name}`, () => {
    it('saves data to the BE', async () => {
        const value = 5;
        const dataSource: CounterDataSource = counterServiceMock;
        const effectFlow: EffectFlow<number> = new EffectFlow<number>();
        const effect = new SaveCountSuccess(dataSource, effectFlow);
        await expect(effect.execute(value)).resolves.toEqual(value);
    });
});
