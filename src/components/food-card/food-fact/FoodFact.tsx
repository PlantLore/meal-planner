import "./FoodFact.css";
import { Tooltip } from "@mui/material";
import { ReactNode } from "react";

const FoodFact = ({
  tooltip,
  icon,
  value,
}: {
  tooltip: string;
  icon: ReactNode;
  value?: number;
}) => {
  return (
    <Tooltip title={tooltip}>
      <span className="food-fact-container">
        {icon}
        {value !== undefined ? `: ${value}` : null}
      </span>
    </Tooltip>
  );
};

export default FoodFact;
