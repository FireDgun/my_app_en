import { Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { LeaderboardContext } from "./LeaderboardProvider";

const ThankYouPage = () => {
  const { setAllUsers, setUpdateRank } = useContext(LeaderboardContext);
  useEffect(() => {
    setAllUsers((prev) => prev.filter((user) => !user?.you));
    setUpdateRank((prev) => !prev);
  }, [setUpdateRank, setAllUsers]);
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h4">תודה רבה על השתתפותך בשאלון!</Typography>
      <br />
      <Typography variant="h5">
        יש לרענן את העמוד כדי לראות את מיקומך בטבלה
      </Typography>
    </div>
  );
};

export default ThankYouPage;
