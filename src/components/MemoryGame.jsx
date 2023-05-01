import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import CountDown from "./CountDown";

const games = [
  {
    homeTeam: "Barcelona",
    awayTeam: "Manchester United",
    id: 1,
    homeScore: 1,
    awayScore: 3,
  },
  {
    homeTeam: "Real Madrid",
    awayTeam: "Arsenal",
    id: 2,
    homeScore: 1,
    awayScore: 1,
  },
  {
    homeTeam: "Paris Saint-Germain",
    awayTeam: "Liverpool",
    id: 3,
    homeScore: 3,
    awayScore: 1,
  },
  {
    homeTeam: "Manchester City",
    awayTeam: "Chelsea",
    id: 4,
    homeScore: 1,
    awayScore: 1,
  },
  {
    homeTeam: "Juventus",
    awayTeam: "Inter Milan",
    id: 5,
    homeScore: 2,
    awayScore: 2,
  },
  {
    homeTeam: "Atlético Madrid",
    awayTeam: "AC Milan",
    id: 6,
    homeScore: 3,
    awayScore: 1,
  },
  {
    homeTeam: "Borussia Dortmund",
    awayTeam: "Ajax",
    id: 7,
    homeScore: 2,
    awayScore: 1,
  },
  {
    homeTeam: "Porto",
    awayTeam: "Manchester City",
    id: 8,
    homeScore: 0,
    awayScore: 1,
  },
  {
    homeTeam: "RB Leipzig",
    awayTeam: "Bayern Munich",
    id: 9,
    homeScore: 4,
    awayScore: 3,
  },
];


const MemoryGame = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomGames, setRandomGames] = useState([]);
  const [timer, setTimer] = useState(7);

  useEffect(() => {
    setRandomGames(games);
    localStorage.setItem("games", JSON.stringify(games));
  }, []);
  useEffect(() => {
    setTimer(7);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex === randomGames.length - 1) {
      onNext(randomGames);
    } else {
      setCurrentIndex((prev) => prev + 1);
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
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        xs={12}
      >
        <Grid item xs="auto">
          <Paper
            elevation={3}
            style={{ padding: "5px", backgroundColor: "#f5f5f5" }}
          >
            <Typography variant="body1">
              {randomGames[currentIndex].awayTeam}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="body1">
            {randomGames[currentIndex].awayScore}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="body1">vs</Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="body1">
            {randomGames[currentIndex].homeScore}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Paper style={{ padding: "16px", backgroundColor: "#f5f5f5" }}>
            <Typography variant="body1">
              {randomGames[currentIndex].homeTeam}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button onClick={handleNext} variant="contained" color="primary">
        next
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
