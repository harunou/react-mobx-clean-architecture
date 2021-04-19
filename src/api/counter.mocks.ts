import { CounterDataSource } from './counter.types';

export const counterServiceMock: CounterDataSource = {
    saveSuccess: jest
        .fn()
        .mockImplementation((value: number) => Promise.resolve(value)),
    saveFailure: jest.fn().mockImplementation(() => Promise.reject('Error'))
};
