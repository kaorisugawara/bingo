export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

export const noDuplicationRandomNumber = (min: number, max: number, array: number[]): number => {
  const number = randomNumber(min, max);
  if (array.includes(number)) return noDuplicationRandomNumber(min, max, array)
  return number;
}

export const createRandomNumberList = (min: number, max: number, length: number) =>
  Array.from(new Set([...Array(length)].map(() => randomNumber(min, max))));

export const noDuplicationSortRandomNumberList = (min: number, max: number) => {
  const size = 5;
  const callCreateRandomNumberList = (length: number) => createRandomNumberList(min, max, length);
  const joinRandomNumberList = (array: number[], remainingNumber: number) => {
    const list = callCreateRandomNumberList(remainingNumber);
    return Array.from(new Set([...array, ...list]));
  }
  const initList = callCreateRandomNumberList(size);
  const createNoDuplicationRandomNumberList = (): number[] => {
    const noDuplicationRandomNumberList = joinRandomNumberList(initList, size - initList.length);
    if(size !== noDuplicationRandomNumberList.length) {
      return createNoDuplicationRandomNumberList();
    }
    return noDuplicationRandomNumberList;
  }
  const List = Array.from(createNoDuplicationRandomNumberList());
  // const sortList = Array.from(createNoDuplicationRandomNumberList()).sort((a, b) => a < b ? -1 : 1);
  return List;
}