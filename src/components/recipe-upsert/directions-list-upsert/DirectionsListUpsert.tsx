import { IconButton, Tooltip } from "@mui/material";
import "./DirectionsListUpsert.css";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import { Step } from "../../../models/Step";
import DirectionUpsert from "./direction-upsert/DirectionUpsert";

const DirectionsListUpsert = ({
  initialSteps,
  onChange,
  submitted,
}: {
  initialSteps: Step[];
  onChange: (updatedSteps: Step[]) => void;
  submitted: boolean;
}) => {
  const [idCounter, setIdCounter] = useState<number>(-1);
  const [steps, setSteps] = useState<Step[]>(
    initialSteps.sort((a: Step, b: Step) => {
      if (a.ordinal > 0 && b.ordinal > 0) {
        return a.ordinal - b.ordinal;
      } else {
        if (a.ordinal > 0) return -1;
        else if (b.ordinal > 0) return 1;
        else return b.ordinal - a.ordinal;
      }
    })
  );

  const handleAddOne = () => {
    const newSteps = [...steps, { ...new Step(), id: idCounter }];
    setSteps(newSteps);
    onChange(newSteps);
    setIdCounter(idCounter - 1);
  };

  const handleUpdateStep = (index: number, step: Step) => {
    const newSteps = [...steps];
    newSteps[index] = step;
    setSteps(newSteps);
    onChange(newSteps);
  };

  const handleDeleteStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
    onChange(newSteps);
  };

  return (
    <div className="directions-list-upsert-container">
      {steps.map((step: Step, index: number) => (
        <div className="directions-list-upsert-step-container" key={step.id}>
          <DirectionUpsert
            step={step}
            onChange={(updatedStep: Step) => {
              handleUpdateStep(index, updatedStep);
            }}
            onDelete={() => {
              handleDeleteStep(index);
            }}
            submitted={submitted}
          />
        </div>
      ))}
      <Tooltip title="Add Step">
        <IconButton onClick={handleAddOne}>
          <AddCircleOutline color="primary" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DirectionsListUpsert;
