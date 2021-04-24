import { CounterDataSource } from './counter.types';

export const counterServiceMock: CounterDataSource = {
    increment: jest
        .fn()
        .mockImplementation((increment: number) => Promise.resolve(increment)),
    save: jest
        .fn()
        .mockImplementation((count: number) => Promise.resolve(count))
};
