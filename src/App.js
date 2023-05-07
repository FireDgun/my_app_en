import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import DetailsEntry from "./components/DetailsEntry";
import Quiz from "./components/Quiz";
import MemoryGame from "./components/MemoryGame";
import ResultsForm from "./components/ResultsForm";
import Instructions from "./components/Instructions";
import Leaderboard from "./components/LeaderBoard";
import ThankYouPage from "./components/ThankYouPage";
import LeaderboardProvider from "./components/LeaderboardProvider";

const gamesData = [
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

function App() {
  const [step, setStep] = useState(1);
  const [games, setGames] = useState([]);
  useEffect(() => {
    const savedStep = JSON.parse(localStorage.getItem("step"));
    if (savedStep == 7) {
      setStep(7);
    }
    if (savedStep == 6 || savedStep == 5) {
      setStep(6);
    }

    if (savedStep == 4) {
      setStep(4);
    }
  }, []);
  const textInstructionsForMemory = ` In this memory game, you will be shown the results of a series of football matches. (Note that the results are not related to games that took place in reality). Your mission is
  Remember the results for each game. After you go through all the games, you will be asked to enter the
  The results you remember. The more accurate your memory, the higher your score will be
  More . Please note that there are only 7 seconds to view each result, and it is not possible to click back. Good luck `;
  const textInstructionForQuestions = ` In the first part of the questionnaire you will be asked to answer 5 short reasoning questions. For each correct answer you will receive 10 points`;
  const nextStep = (newGames) => {
    if (step > 4) {
      setGames(gamesData);
    }
    setStep((prev) => {
      localStorage.setItem("step", prev + 1);
      return prev + 1;
    });
  };
  return (
    <LeaderboardProvider step={step}>
      <Container>
        <Grid container>
          <Grid item lg={8} md={8} s={3}>
            {step === 1 && <DetailsEntry onNext={nextStep} />}
            {step === 2 && (
              <Instructions
                text={textInstructionForQuestions}
                onNext={nextStep}
              />
            )}
            {step === 3 && <Quiz onNext={nextStep} />}
            {step === 4 && (
              <Instructions
                text={textInstructionsForMemory}
                onNext={nextStep}
              />
            )}
            {step === 5 && <MemoryGame onNext={nextStep} />}
            {step === 6 && <ResultsForm games1={gamesData} onNext={nextStep} />}
            {step === 7 && <ThankYouPage />}
          </Grid>
          {step > 3 && (
            <Grid item lg={4} md={4} s={3}>
              <Leaderboard />
            </Grid>
          )}
        </Grid>
      </Container>
    </LeaderboardProvider>
  );
}

export default App;
