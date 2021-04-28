import {
    CounterService,
    COUNTER_INCREMENT_ENDPOINT
} from '@api/counter.service';
import { CounterDataSource } from '@api/counter.types';
import { httpClient } from '@core/http-client';
import { EffectFlow } from '@stores/helpers/effect/effect.helpers';
import { IncrementCount } from './increment-count.effect';

describe(`${IncrementCount.name}`, () => {
    const increment = 3;
    let dataSource: CounterDataSource;
    let effectFlow: EffectFlow<number>;
    let effect: IncrementCount;
    beforeEach(() => {
        dataSource = new CounterService();
        effectFlow = new EffectFlow<number>();
        effect = new IncrementCount(dataSource, effectFlow);
    });
    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });
    it('saves data to the BE', () => {
        jest.spyOn(dataSource, 'increment');
        effect.execute(increment);
        expect(dataSource.increment).toBeCalledTimes(1);
        expect(dataSource.increment).toBeCalledWith(increment);
        httpClient.clean();
    });
    it('returns BE response', async () => {
        const incrementResponse = 5;
        const data = effect.execute(increment);
        httpClient.match(COUNTER_INCREMENT_ENDPOINT).resolve(incrementResponse);
        await expect(data).resolves.toEqual(incrementResponse);
    });
    it('cancels the request', async () => {
        const data = effect.execute(increment);
        effect.cancel();
        httpClient.clean();
        await expect(data).rejects.toEqual(new Error('FLOW_CANCELLED'));
    });
});
