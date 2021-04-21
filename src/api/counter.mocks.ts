import { CounterDataSource } from './counter.types';

export const counterServiceMock: CounterDataSource = {
    increment: jest
        .fn()
        .mockImplementation((increment: number, count: number) =>
            Promise.resolve(increment + count)
        ),
    save: jest
        .fn()
        .mockImplementation((count: number) => Promise.resolve(count))
};
