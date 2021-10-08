import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { createCardNumberList } from './utils/cardNumberList';
import { noDuplicationRandomNumber } from './utils/random';

const App: React.FC = () => {
  const [ball, setBall] = useState<number>(0);
  const [cardNumberList, setCardNumberList] = useState<number[][]>([]);
  const [isBingo, setIsBingo] = useState<boolean>(false);
  const [isReach, setIsReach] = useState<boolean>(false);
  const [hasBingo, setHasBingo] = useState<boolean>(false);
  const [noBall, setNoBall] = useState<boolean>(false);
  const [patched, setPatched] = useState<boolean>(false);
  const [patchList, setPatchList] = useState<number[]>([0]);
  const [randomNumberList, setRandomNumberList] = useState<number[][]>([]);

  // eslint-disable-next-line
  useEffect(() => {
    const initCard = createCardNumberList() ;
    setCardNumberList(initCard.cardList);
    setRandomNumberList(initCard.list);
  }, []);

  const getRowArray = [...Array(5)].map((_, i) => randomNumberList.map(li => li[i]));
  const getColArray = [...Array(5)].map((_, i) => cardNumberList.map(li => li[i]));
  const getCrossArray: number[][] = cardNumberList.length ? [
    [cardNumberList[0][0], cardNumberList[1][1], 0, cardNumberList[3][3], cardNumberList[4][4]],
    [cardNumberList[0][4], cardNumberList[1][3], 0, cardNumberList[3][1], cardNumberList[4][0]]
  ] : [];
  const getRowColCrossArray = [
    ...getColArray,
    ...getCrossArray,
    ...getRowArray,
  ];

  // 今回はbingo or reach判定は一回。
  const checkReachOrBingo = (reachOrBingo: number) => {
    return getRowColCrossArray
      .map(li =>li
        .map(cardNum => {
          const boolList = patchList
            .map(patchNum => patchNum === cardNum)
            .filter(Boolean);
          return boolList.length ? true : false;
        })
        .filter(Boolean)
      ).some(bool => bool.length === reachOrBingo);
  };

  const reset = () => {
    setBall(0);
    setCardNumberList(createCardNumberList().cardList);
    setHasBingo(false);
    setNoBall(false);
    setPatched(false);
    setPatchList([0]);
  };

  const pickBall = () => {
    if (patchList.length < 76) {
      const number = noDuplicationRandomNumber(1, 75, patchList);
      cardNumberList.some(li => li.includes(number)) ? setPatched(true) : setPatched(false);
      setBall(number);
      setHasBingo(isBingo);
      setPatchList(patchList.concat(number));
    } else {
      setNoBall(true);
    }
  }

  useEffect(() => {
    setIsBingo(checkReachOrBingo(5));
    setIsReach(checkReachOrBingo(4));
  }, [patchList]);

  return (
    <div className="App">
      <div className="ballNumber">りいち：{isReach ? 'りいちだ！！' : 'まだ'}</div>
      <div className="ballNumber">びんご：{isBingo ? 'びんごした！！！おめ！！' : 'まだ'}</div>
      <div className="ballNumber">ひいたすーじ：{ball} {patched && 'あたた！'} {hasBingo && 'もうひいてもいみない'}</div>
      {noBall && <div>もうぼーるなくなた　りせっとだー！！</div>}
      <button
        type="button"
        className="button"
        onClick={() => pickBall()}>ぼーるだす</button>
      <button className="button" type="button" onClick={() => reset()}>りせっと</button>
      <div className="card-wapper">
        <Card patchList={patchList} cardNumberList={cardNumberList} />
      </div>
    </div>
  );
}

export default App;
