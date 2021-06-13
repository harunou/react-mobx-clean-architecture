import { CounterSource } from '../../stores/persistence/counter-source/counter-source.types';

export const counterRemoteSourceServiceMock: CounterSource = {
    get: jest.fn().mockImplementation(() => Promise.resolve(0)),
    increment: jest
        .fn()
        .mockImplementation((increment: number) => Promise.resolve(increment)),
    save: jest
        .fn()
        .mockImplementation((count: number) => Promise.resolve(count))
};
