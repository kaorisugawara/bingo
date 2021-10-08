import React from "react";
import "./index.css";

interface CellProps {
  isOpen: boolean;
  value: number;
}

const Cell:React.FC<CellProps> = (props: CellProps) => {
  const { isOpen, value } = props;
  return (
    <div className="cell-wrapper">
      <div className={isOpen ? 'cell cell-opened' : 'cell'}>
        {value !== 0 ? value : 'Free'}
      </div>
    </div>
  );
}

export default Cell;