import { counterServiceMock } from '@api/counter.mocks';
import { CounterDataSource } from '@api/counter.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { SaveCount } from './save-count.effect';

describe(`${SaveCount.name}`, () => {
    const count = 5;
    let dataSource: CounterDataSource;
    let effectFlow: EffectFlow<number>;
    let effect: SaveCount;
    beforeEach(() => {
        dataSource = counterServiceMock;
        effectFlow = new EffectFlow<number>();
        effect = new SaveCount(dataSource, effectFlow);
    });
    it('saves data to the BE', () => {
        effect.execute(count);
        expect(dataSource.save).toBeCalledTimes(1);
        expect(dataSource.save).toBeCalledWith(count);
    });
    it('returns BE response', async () => {
        await expect(effect.execute(count)).resolves.toEqual(count);
    });
});
