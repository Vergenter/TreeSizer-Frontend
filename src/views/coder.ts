import { none, some, Option } from "fp-ts/lib/Option";
const range = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_~+,*:@`.split(
  ""
);
export const maxBase = range.length;
export function convertBase(value: string, fromBase: number, toBase: number) {
  const fromRange = range.slice(0, fromBase);
  const toRange = range.slice(0, toBase);

  let decValue = value
    .split("")
    .reverse()
    .reduce(function(carry, digit, index) {
      if (fromRange.indexOf(digit) === -1)
        throw new Error(
          "Invalid digit `" + digit + "` for base " + fromBase + "."
        );
      return (carry += fromRange.indexOf(digit) * Math.pow(fromBase, index));
    }, 0);

  let newValue = "";
  while (decValue > 0) {
    newValue = toRange[decValue % toBase] + newValue;
    decValue = (decValue - (decValue % toBase)) / toBase;
  }
  return newValue || "0";
}
export function getHash(hash: string): Option<number> {
  return hash.length &&
    hash.length === hash.split("").filter(char => range.includes(char)).length
    ? some(Number.parseInt(convertBase(hash, maxBase, 10), 10))
    : none;
}
convertBase("", 1, 1);
