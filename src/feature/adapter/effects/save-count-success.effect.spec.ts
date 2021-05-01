import { counterServiceMock } from '@api/counter.mocks';
import { CounterSource } from '@stores/persistence/counter-source.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { SaveCountSuccess } from './save-count-success.effect';

describe(`${SaveCountSuccess.name}`, () => {
    const count = 5;
    let counterService: CounterSource;
    let effectFlow: EffectFlow<number>;
    let effect: SaveCountSuccess;
    beforeEach(() => {
        counterService = counterServiceMock;
        effectFlow = new EffectFlow<number>();
        effect = new SaveCountSuccess(counterService, effectFlow);
    });
    it('saves data to the BE', () => {
        effect.execute(count);
        expect(counterService.save).toBeCalledTimes(1);
        expect(counterService.save).toBeCalledWith(count);
    });
    it('returns BE response', async () => {
        await expect(effect.execute(count)).resolves.toEqual(count);
    });
});
