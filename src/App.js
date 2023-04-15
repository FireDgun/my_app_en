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
  const textInstructionsForMemory = ` במשחק זיכרון זה, יוצגו לך התוצאות של סדרת משחקי כדורגל. המשימה שלך היא
  לזכור את התוצאות עבור כל משחק. לאחר שתעבור על כל המשחקים, תתבקש להזין את
  התוצאות שאתה זוכר. ככל שהזיכרון שלך מדויק יותר, כך הציון שלך יהיה גבוה
  יותר . שימו לב כי יש רק 10 שניות לצפות בכל תוצאה, ואין אפשרות ללחוץ חזור. בהצלחה`;
  const textInstructionForQuestions = ` בחלק הראשון של השאלון תתבקשו לענות על 5 שאלות הגיון קצרות. עבור כל תשובה נכונה תקבלו 10 נקודות`;
  const nextStep = (newGames) => {
    if (newGames) {
      setGames(newGames);
    }
    setStep(step + 1);
  };
  console.log(step);
  return (
    <LeaderboardProvider step={step}>
      <Container>
        <Grid container>
          {step > 3 && (
            <Grid item lg={4} md={4} s={3}>
              <Leaderboard />
            </Grid>
          )}
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
            {step === 6 && <ResultsForm games={games} onNext={nextStep} />}
            {step === 7 && <ThankYouPage />}
          </Grid>
        </Grid>
      </Container>
    </LeaderboardProvider>
  );
}

export default App;
