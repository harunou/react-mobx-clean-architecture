import { CounterSource } from '../stores/persistence/counter-source.types';

export const counterServiceMock: CounterSource = {
    increment: jest
        .fn()
        .mockImplementation((increment: number) => Promise.resolve(increment)),
    save: jest
        .fn()
        .mockImplementation((count: number) => Promise.resolve(count))
};
