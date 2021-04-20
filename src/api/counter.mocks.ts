import { CounterDataSource } from './counter.types';

export const counterServiceMock: CounterDataSource = {
    increment: jest
        .fn()
        .mockImplementation((value: number, count: number) =>
            Promise.resolve(value + count)
        ),
    saveSuccess: jest
        .fn()
        .mockImplementation((value: number) => Promise.resolve(value)),
    saveFailure: jest.fn().mockImplementation(() => Promise.reject('Error'))
};
