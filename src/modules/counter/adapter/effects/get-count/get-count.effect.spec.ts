import { counterRemoteSourceServiceMock } from '@api/counterRemoteSource/counterRemoteSource.mocks';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { GetCountEffect } from './get-count.effect';

describe.skip(`${GetCountEffect.name}`, () => {
    let counterService: CounterSource;
    let effect: GetCountEffect;
    beforeEach(() => {
        counterService = counterRemoteSourceServiceMock;
        effect = new GetCountEffect(counterService);
    });
    it('calls count service get method', () => {
        effect.execute();
        expect(counterService.get).toBeCalledTimes(1);
    });
    it('returns BE response', async () => {
        await expect(effect.execute()).resolves.toEqual(0);
    });
});
