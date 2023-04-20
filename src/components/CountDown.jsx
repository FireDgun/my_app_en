import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const CountDown = ({ time, onCountdownEnd, currentIndex }) => {
  const [secondsLeft, setSecondsLeft] = useState(time);

  useEffect(() => {
    setSecondsLeft(time);
  }, [time, currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      onCountdownEnd();
    }
  }, [secondsLeft, onCountdownEnd]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <Typography variant="h4" component="h2">
      {`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}
    </Typography>
  );
};

export default CountDown;
