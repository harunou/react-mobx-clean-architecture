export const removeFromArray = <T>(array: T[], item: T): boolean => {
    const index = array.indexOf(item);
    if (index === -1) {
        return false;
    }
    array.splice(index, 1);
    return true;
};
