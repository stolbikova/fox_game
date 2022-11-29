export function after(count: number, cb: () => void) {
    let noOfCalls = 0;
    return function () {
      noOfCalls ++;
      if (count === noOfCalls) {
        cb();
      }
    };
  }