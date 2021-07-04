import { CounterSource } from './counter-source.types';

export const makeCounterSourceModelMock = (count = 0): CounterSource => {
    return {
        get: jest.fn().mockImplementation(() => Promise.resolve(count)),
        increment: jest
            .fn()
            .mockImplementation((increment: number) =>
                Promise.resolve(increment + count)
            ),
        save: jest
            .fn()
            .mockImplementation((count: number) => Promise.resolve(count))
    };
};
