import { autorun } from 'mobx';

export const runInReactiveContext = (fn: () => void): void => {
    autorun(fn)();
};
