import { noDuplicationSortRandomNumberList } from '..//utils/random';

export const createCardNumberList = () => {
  const firstColumn = noDuplicationSortRandomNumberList(1, 15);
  const secondColumn = noDuplicationSortRandomNumberList(16, 30);
  // 真ん中はFree
  const thirdColumn = noDuplicationSortRandomNumberList(31, 45)
    .map((num, i) => i === 2 ? 0 : num);
  const fourthColumn = noDuplicationSortRandomNumberList(46, 60);
  const fifthColumn = noDuplicationSortRandomNumberList(61, 75);
  const list = [firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn];
  const cardList = [
    list.map(li => li[0]),
    list.map(li => li[1]),
    list.map(li => li[2]),
    list.map(li => li[3]),
    list.map(li => li[4])
  ]
  return {cardList, list};
}