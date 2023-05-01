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

function App() {
  const [step, setStep] = useState(1);
  const [games, setGames] = useState([]);
  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem("games"));
    if (storedGames && storedGames.length) {
      setStep(7);
    }
  }, []);
  const textInstructionsForMemory = ` In this memory game, you will be shown the results of a series of football matches. (Note that the results are not related to games that took place in reality). Your mission is
  Remember the results for each game. After you go through all the games, you will be asked to enter the
  The results you remember. The more accurate your memory, the higher your score will be
  More . Please note that there are only 7 seconds to view each result, and it is not possible to click back. Good luck `
  const textInstructionForQuestions = ` In the first part of the questionnaire you will be asked to answer 5 short reasoning questions. For each correct answer you will receive 10 points`;
  const nextStep = (newGames) => {
    if (newGames) {
      setGames(newGames);
    }
    setStep(step + 1);
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
            {step === 6 && <ResultsForm games1={games} onNext={nextStep} />}
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
