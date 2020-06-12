// pure function

export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
    const difference = Math.abs(end - start);
    return new Array(difference + 1)
        .fill('')
        .map((_, index) => Math.min(start, end) + index);
}
