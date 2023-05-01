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
      <Typography variant="h4">Thank you very much for your participation in the questionnaire!</Typography>
      <br />
      <Typography variant="h5">
      Refresh the page to see your rank
      </Typography>
    </div>
  );
};

export default ThankYouPage;
