export function generateRandomIntegersArray(start: number, end: number): number[] {
    const length = end - start + 1;
    const array = Array.from({ length }, (_, index) => index + start);
    return array.sort(() => numberToComparatorResult(Math.random()));
}

function numberToComparatorResult(number: number): -1 | 0 | 1 {
    if (number === 0) {
        return 0;
    }
    return number < 0 ? -1 : 1;
}
