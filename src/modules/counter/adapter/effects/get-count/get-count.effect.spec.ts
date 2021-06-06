import { counterServiceMock } from '@api/counter.mocks';
import { CounterSource } from '@stores/persistence/counter-source.types';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { GetCountEffect } from './get-count.effect';

describe(`${GetCountEffect.name}`, () => {
    let counterService: CounterSource;
    let effectFlow: EffectFlow<number>;
    let effect: GetCountEffect;
    beforeEach(() => {
        counterService = counterServiceMock;
        effectFlow = new EffectFlow<number>();
        effect = new GetCountEffect(
            { counterRemoteService: counterService },
            effectFlow
        );
    });
    it('calls count service get method', () => {
        effect.execute();
        expect(counterService.get).toBeCalledTimes(1);
    });
    it('returns BE response', async () => {
        await expect(effect.execute()).resolves.toEqual(0);
    });
});
