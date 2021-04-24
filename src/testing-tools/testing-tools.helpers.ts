export const sleep = (ms = 0): Promise<unknown> =>
    new Promise((resolve) => setTimeout(resolve, ms));
