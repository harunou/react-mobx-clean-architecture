import { counterRemoteSourceServiceMock } from '@api/counterRemoteSource/counterRemoteSource.mocks';
import { CounterSourceStore } from '@stores/persistence/counter-source/counter-source.store';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { CancellablePromise } from 'mobx/dist/internal';
import {
    getCountEffect,
    incrementCountEffect,
    saveCountEffect
} from './counter.effects';

describe(`${getCountEffect.name}`, () => {
    const initial = 3;
    let counterSourceService: CounterSource;
    let counterSource: CounterSource;
    let effect: CancellablePromise<number>;

    beforeEach(() => {
        counterSourceService = counterRemoteSourceServiceMock(initial);
        counterSource = new CounterSourceStore(counterSourceService);
        jest.spyOn(counterSource, 'get');
        effect = getCountEffect({ counterSource });
    });
    it('calls count service get method', async () => {
        await effect;
        expect(counterSource.get).toBeCalledTimes(1);
    });
    it('returns BE response', async () => {
        await expect(effect).resolves.toEqual(initial);
    });
});

describe(`${incrementCountEffect.name}`, () => {
    const initial = 4;
    const increment = 3;
    let counterSourceService: CounterSource;
    let counterSource: CounterSource;
    let effect: CancellablePromise<number>;
    beforeEach(() => {
        counterSourceService = counterRemoteSourceServiceMock(initial);
        counterSource = new CounterSourceStore(counterSourceService);
        jest.spyOn(counterSource, 'increment');
        effect = incrementCountEffect(increment, {
            counterSource
        });
    });
    it('saves data to the BE', async () => {
        await effect;
        expect(counterSource.increment).toBeCalledTimes(1);
        expect(counterSource.increment).toBeCalledWith(increment);
    });
    it('returns BE response', async () => {
        await expect(effect).resolves.toEqual(initial + increment);
    });
});

describe.skip(`${saveCountEffect.name}`, () => {
    const initial = 4;
    const count = 3;
    let counterSourceService: CounterSource;
    let counterSource: CounterSource;
    let effect: CancellablePromise<number>;
    beforeEach(() => {
        counterSourceService = counterRemoteSourceServiceMock(initial);
        counterSource = new CounterSourceStore(counterSourceService);
        jest.spyOn(counterSource, 'increment');
        effect = saveCountEffect(count, {
            counterSource
        });
    });
    it('saves data to the BE', async () => {
        await effect;
        expect(counterSource.save).toBeCalledTimes(1);
        expect(counterSource.save).toBeCalledWith(count);
    });
    it('returns BE response', async () => {
        await expect(effect).resolves.toEqual(count);
    });
});
