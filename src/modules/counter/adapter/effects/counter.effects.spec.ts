import { makeCounterSourceModelMock } from '@stores/persistence/counter-source/counter-source.mock';
import { CounterSource } from '@stores/persistence/counter-source/counter-source.types';
import { CancellablePromise } from 'mobx/dist/internal';
import { counterEffects } from './counter.effects';

describe(`${counterEffects.getCounter.name}`, () => {
    const initial = 3;
    let counterSource: CounterSource;
    let effect: CancellablePromise<number>;

    beforeEach(() => {
        counterSource = makeCounterSourceModelMock(initial);
        effect = counterEffects.getCounter({ counterSource });
    });
    it('calls counter source getCount method', async () => {
        await effect;
        expect(counterSource.get).toBeCalledTimes(1);
    });
    it('returns counter state', async () => {
        await expect(effect).resolves.toEqual(initial);
    });
});

describe(`${counterEffects.incrementCounter.name}`, () => {
    const initial = 4;
    const increment = 3;
    let counterSource: CounterSource;
    let effect: CancellablePromise<number>;
    beforeEach(() => {
        counterSource = makeCounterSourceModelMock(initial);
        effect = counterEffects.incrementCounter(increment, {
            counterSource
        });
    });
    it('calls counter source increment method', async () => {
        await effect;
        expect(counterSource.increment).toBeCalledTimes(1);
        expect(counterSource.increment).toBeCalledWith(increment);
    });
    it('returns incremented value', async () => {
        await expect(effect).resolves.toEqual(initial + increment);
    });
});

describe(`${counterEffects.setCounter.name}`, () => {
    const initial = 4;
    const count = 3;
    let counterSource: CounterSource;
    let effect: CancellablePromise<number>;
    beforeEach(() => {
        counterSource = makeCounterSourceModelMock(initial);
        effect = counterEffects.setCounter(count, {
            counterSource
        });
    });
    it('calls counter source setCount method', async () => {
        await effect;
        expect(counterSource.set).toBeCalledTimes(1);
        expect(counterSource.set).toBeCalledWith(count);
    });
    it('return counter state', async () => {
        await expect(effect).resolves.toEqual(count);
    });
});
