import { CounterDataSource } from './counter.types';

export const counterServiceMock: CounterDataSource = {
    saveSuccess: jest
        .fn()
        .mockImplementationOnce((value: number) => Promise.resolve(value)),
    saveFailure: jest.fn().mockImplementationOnce(() => Promise.reject('Error'))
};
