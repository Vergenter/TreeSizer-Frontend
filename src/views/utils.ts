import { dropLeft, splitAt } from "fp-ts/lib/Array";
import LeaderLine from "leader-line-vue";

export function createLine(start: HTMLElement, end: HTMLElement) {
  return LeaderLine.setLine(start, end, {
    path: "straight",
    startSocket: "top",
    endSocket: "bottom"
  });
}
export const getUpdatesLines = (
  createLineFromIndeces: (from: number, to: number) => any
) => (linesData: number[][], lines: any[][]) => {
  let result = lines;
  if (linesData.length < result.length) {
    const [curr, old] = splitAt(linesData.length)(result);
    result = curr;
    // old.flat(1).forEach(oldLine => oldLine.remove());
  }
  if (linesData.length > result.length) {
    result = result.concat(
      dropLeft(result.length)(linesData).map(_ => [] as any[])
    );
  }
  result = result.map((row, from) => {
    if (row.length === linesData[from].length) {
      return row;
    } else if (row.length > linesData[from].length) {
      const [curr, old] = splitAt(linesData[from].length)(row);
      old.flat(1).forEach(oldLine => oldLine.remove());
      return curr;
    } /*(row.length < linesData[from].length)*/ else {
      return row.concat(
        dropLeft(result[from].length)(linesData[from]).map(to =>
          createLineFromIndeces(from, to)
        )
      );
    }
  });
  return result;
};
let timerId: number | undefined;
export function throttleFunction(func: () => void, delay: number) {
  // If setTimeout is already scheduled, no need to do anything
  if (timerId) {
    return;
  }

  // Schedule a setTimeout after delay seconds
  timerId = setTimeout(function() {
    func();

    // Once setTimeout function execution is finished, timerId = undefined so that in <br>
    // the next scroll event function execution can be scheduled by the setTimeout
    timerId = undefined;
  }, delay);
}
