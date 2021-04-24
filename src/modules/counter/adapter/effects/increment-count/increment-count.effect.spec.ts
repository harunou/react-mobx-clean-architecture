import { counterServiceMock } from '@api/counter.mocks';
import { CounterDataSource } from '@api/counter.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { IncrementCount } from './increment-count.effect';

describe(`${IncrementCount.name}`, () => {
    const increment = 3;
    let dataSource: CounterDataSource;
    let effectFlow: EffectFlow<number>;
    let effect: IncrementCount;
    beforeEach(() => {
        dataSource = counterServiceMock;
        effectFlow = new EffectFlow<number>();
        effect = new IncrementCount(dataSource, effectFlow);
    });
    it('saves data to the BE', () => {
        effect.execute(increment);
        expect(dataSource.increment).toBeCalledTimes(1);
        expect(dataSource.increment).toBeCalledWith(increment);
    });
    it('returns BE response', async () => {
        await expect(effect.execute(increment)).resolves.toEqual(increment);
    });
});
