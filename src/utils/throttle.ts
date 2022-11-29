export function throttle({ callback, limit, time }: { callback: () => void, limit: number, time: number }) {
    // monitor the count
    let calledCount = 0;

    // refresh the `calledCount` varialbe after the `time` has been passed
    setInterval(function () { calledCount = 0 }, time);

    // creating a closure that will be called
    return function () {
        // checking the limit (if limit is exceeded then do not call the passed function
        if (limit > calledCount) {
            // increase the count
            calledCount++;

            console.log('limit', limit, 'called count', calledCount)
            console.log('clicked');
            callback(); // call the function
        }
        else console.log('not calling because the limit has exceeded');
    };
}
