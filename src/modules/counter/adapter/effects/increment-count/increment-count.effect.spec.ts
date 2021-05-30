import {
    CounterRemoteService,
    COUNTER_INCREMENT_ENDPOINT
} from '@api/counter.service';
import { CounterSource } from '@stores/persistence/counter-source.types';
import { httpClient } from '@core/http-client';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { IncrementCount } from './increment-count.effect';

describe(`${IncrementCount.name}`, () => {
    const increment = 3;
    let counterService: CounterSource;
    let effectFlow: EffectFlow<number>;
    let effect: IncrementCount;
    beforeEach(() => {
        counterService = new CounterRemoteService();
        effectFlow = new EffectFlow<number>();
        effect = new IncrementCount(counterService, effectFlow);
    });
    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });
    it('saves data to the BE', () => {
        jest.spyOn(counterService, 'increment');
        effect.execute(increment);
        expect(counterService.increment).toBeCalledTimes(1);
        expect(counterService.increment).toBeCalledWith(increment);
        httpClient.clean();
    });
    it('returns BE response', async () => {
        const incrementResponse = 5;
        const data = effect.execute(increment);
        httpClient
            .expectOne(COUNTER_INCREMENT_ENDPOINT)
            .resolve(incrementResponse);
        await expect(data).resolves.toEqual(incrementResponse);
    });
    it('cancels the request', async () => {
        const data = effect.execute(increment);
        effect.cancel();
        httpClient.clean();
        await expect(data).rejects.toEqual(new Error('FLOW_CANCELLED'));
    });
});
