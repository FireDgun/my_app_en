import React, { useContext, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { LeaderboardContext } from "./LeaderboardProvider";

const Instructions = ({ text, onNext }) => {
  const { setUpdateRank } = useContext(LeaderboardContext);
  useEffect(() => {
    setUpdateRank((prev) => !prev);
  }, [setUpdateRank]);
  return (
    <div>
      <Typography
        variant="h4"
        style={{ marginBottom: "16px" }}
      >
        Instructions
      </Typography>
        <Typography
          variant="body1"
        >
          {text}
        </Typography>
      <Button onClick={onNext} variant="contained" color="primary">
        next
      </Button>
    </div>
  );
};

export default Instructions;
