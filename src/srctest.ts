/**
 * Sleep
 * @param time 时间(ms)
 * @returns
 */
function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export default sleep;
