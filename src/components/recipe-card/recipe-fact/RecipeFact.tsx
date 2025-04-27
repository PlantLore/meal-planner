import "./RecipeFact.css";
import { Tooltip } from "@mui/material";
import { ReactNode } from "react";

const RecipeFact = ({
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
      <span className="recipe-fact-container">
        {icon}
        {value !== undefined ? `: ${value}` : null}
      </span>
    </Tooltip>
  );
};

export default RecipeFact;
