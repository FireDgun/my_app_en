import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import CountDown from "./CountDown";

const games = [
  {
    homeTeam: "מכבי פתח תקווה",
    awayTeam: "מכבי בני ריינה",
    id: 1,
    homeScore: 1,
    awayScore: 3,
  },
  {
    homeTeam: "הפועל חיפה",
    awayTeam: 'בית"ר ירושלים',
    id: 2,
    homeScore: 1,
    awayScore: 1,
  },
  {
    homeTeam: "הפועל תל אביב",
    awayTeam: "סקציה נס ציונה",
    id: 3,
    homeScore: 3,
    awayScore: 1,
  },
  {
    homeTeam: "בני סכנין",
    awayTeam: "הפועל באר שבע",
    id: 4,
    homeScore: 1,
    awayScore: 1,
  },
  {
    homeTeam: "מכבי חיפה",
    awayTeam: "הפועל חדרה",
    id: 5,
    homeScore: 2,
    awayScore: 2,
  },
  {
    homeTeam: "הפועל חיפה",
    awayTeam: "מכבי תל אביב",
    id: 6,
    homeScore: 3,
    awayScore: 1,
  },
  {
    homeTeam: "הפועל ירושלים",
    awayTeam: "מ.ס אשדוד",
    id: 7,
    homeScore: 2,
    awayScore: 1,
  },
  {
    homeTeam: "בני יהודה",
    awayTeam: "הפועל כפר סבא",
    id: 8,
    homeScore: 0,
    awayScore: 1,
  },
  {
    homeTeam: "עירוני קרית שמונה",
    awayTeam: "מכבי נתניה",
    id: 9,
    homeScore: 4,
    awayScore: 3,
  },
];

const MemoryGame = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomGames, setRandomGames] = useState([]);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    setRandomGames(games);
    localStorage.setItem("games", JSON.stringify(games));
  }, []);
  useEffect(() => {
    setTimer(10);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex === randomGames.length - 1) {
      onNext(randomGames);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  if (!randomGames.length) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Typography variant="h4">
        {randomGames[currentIndex].homeTeam} vs{" "}
        {randomGames[currentIndex].awayTeam}
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <Paper
            elevation={3}
            style={{ padding: "16px", backgroundColor: "#f5f5f5" }}
          >
            <Typography variant="body1">
              {randomGames[currentIndex].awayTeam}
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {randomGames[currentIndex].awayScore}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">vs</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {randomGames[currentIndex].homeScore}
          </Typography>
        </Grid>
        <Grid item>
          <Paper
            elevation={3}
            style={{ padding: "16px", backgroundColor: "#f5f5f5" }}
          >
            <Typography variant="body1">
              {randomGames[currentIndex].homeTeam}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Button onClick={handleNext} variant="contained" color="primary">
        הבא
      </Button>
      <CountDown
        time={timer}
        onCountdownEnd={handleNext}
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default MemoryGame;
