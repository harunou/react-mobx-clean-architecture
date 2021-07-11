import { CounterSourceModel } from './counter-source-store.types';

export const makeCounterSourceModelMock = (count = 0): CounterSourceModel => {
    return {
        set: jest
            .fn()
            .mockImplementation((count: number) => Promise.resolve(count)),
        get: jest.fn().mockImplementation(() => Promise.resolve(count)),
        increment: jest
            .fn()
            .mockImplementation((increment: number) =>
                Promise.resolve(increment + count)
            )
    };
};
