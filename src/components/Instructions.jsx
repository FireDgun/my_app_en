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
      {text.split(".").map((line, index) => (
        <Typography
          variant="body1"
          sx={{ textAlign: "right" }}
          key={JSON.stringify(line)}
        >
          {index === text.split(".").length - 1 ? "!" : "."}
          {line}
        </Typography>
      ))}
      <Typography
        variant="h6"
        style={{ marginBottom: "16px", textAlign: "center" }}
      >
        שימו לב! המשתתף שיזכה בהכי הרבה נקודות מבין כל המשתתפים יזכה בשובר הטבה
        על סך 100 שח
      </Typography>
      <Button onClick={onNext} variant="contained" color="primary">
        הבא
      </Button>
    </div>
  );
};

export default Instructions;
