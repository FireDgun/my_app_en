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
        style={{ marginBottom: "16px", textAlign: "right" }}
      >
        הוראות
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "right" }}>
        {text}
      </Typography>
      <Button onClick={onNext} variant="contained" color="primary">
        הבא
      </Button>
    </div>
  );
};

export default Instructions;
