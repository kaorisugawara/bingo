import React from "react";
import "./index.css";
import logo from '../../logo.svg';
import Cell from "../Cell";

interface CardProps {
  cardNumberList: number[][];
  patchList: number[];
}

const Card:React.FC<CardProps> = (props: CardProps) => {
  const { cardNumberList, patchList } = props;
  const isOpend = (val: number) => val === 0 || patchList.includes(val);

  return (
    <div className="card">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        <p>びんごげーむやるぞーい</p>
      </div>
      <div className="card-contents">
        <table cellSpacing="3">
          {cardNumberList.map((li, i) => {
            return (
              <tbody key={i}>
                <tr>
                    {
                    li.map((val, idx) => {
                        return (
                        <td key={idx}>
                            <Cell isOpen={isOpend(val)} value={val} />
                        </td>
                        )
                    })}
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </div>
  );
}

export default Card;