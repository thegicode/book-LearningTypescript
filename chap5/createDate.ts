function createDate(timsstamp: number): Date;

function createDate(month: number, day: number, year: number): Date;

function createDate(monthOrTimestamp: number, day?: number, year?: number) {
    return day === undefined || year === undefined
        ? new Date(monthOrTimestamp)
        : new Date(year, monthOrTimestamp, day);
}

createDate(554346880);

createDate(7, 28, 1987);

createDate(4, 1);
// Error : No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
