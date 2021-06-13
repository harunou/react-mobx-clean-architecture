import {
    CounterRemoteSourceService,
    COUNTER_INCREMENT_ENDPOINT
} from '@api/counterRemoteSource/counterRemoteSource.service';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { httpClient } from '@core/http-client';
import { IncrementCountEffect } from './increment-count.effect';

describe(`${IncrementCountEffect.name}`, () => {
    const increment = 3;
    let counterService: CounterSource;
    let effect: IncrementCountEffect;
    beforeEach(() => {
        counterService = new CounterRemoteSourceService();
        effect = new IncrementCountEffect(counterService);
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
        httpClient.expectOne(COUNTER_INCREMENT_ENDPOINT);
        await expect(data).rejects.toEqual(new Error('FLOW_CANCELLED'));
    });
});
