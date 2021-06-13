import { counterRemoteSourceServiceMock } from '@api/counterRemoteSource/counterRemoteSource.mocks';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { SaveCountEffect } from './save-count.effect';

describe(`${SaveCountEffect.name}`, () => {
    const count = 5;
    let counterService: CounterSource;
    let effect: SaveCountEffect;
    beforeEach(() => {
        counterService = counterRemoteSourceServiceMock;
        effect = new SaveCountEffect(counterService);
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
