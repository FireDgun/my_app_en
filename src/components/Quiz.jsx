import React, { useRef, useState, useEffect, useContext } from "react";
import { TextField, Typography, Button, Box, Select } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import CountDown from "./CountDown";
import { LeaderboardContext } from "./LeaderboardProvider";

const questions = [
  {
    text: "את/ה במירוץ ואת/ה עוקפ/ת את האדם במקום השני. באיזה מקום את/ה נמצא כעת",
    correctAnswer: 2,
    id: 1,
  },
  {
    text: " כמה סמ״ק של חול יש בבור בגודל 3*3*3",
    correctAnswer: 0,

    id: 2,
  },
  {
    text: "ל-5 מכונות לוקח 5 דקות לייצר 5 מוצרים. כמה דקות ייקח ל100 מכונות לייצר 100 מוצרים",
    correctAnswer: 5,

    id: 3,
  },
  {
    text: "חילזון נמצא בתחתית באר בגובה 30 מטר. בכל יום הוא מטפס למעלה 3 מטר, אבל בכל לילה הוא מחליק למטה 2 מטר, כמה ימים ייקח לחילזון. לטפס מהבאר",
    correctAnswer: 28,
    id: 4,
  },
  {
    text: " על מדף בספרייה נמצא ספר. הוא הספר השלישי מימין והחמישי משמאל. כמה ספרים יש על המדף",
    correctAnswer: 7,
    id: 5,
  },
  {
    text: "אם רופא ממליץ לקחת כדור כל חצי שעה. תוך כמה דקות תיקח 3 כדורים",
    correctAnswer: 60,
    id: 6,
  },
];

const IMAGES = [
  "images/race.jpeg",
  "images/hole.jpeg",
  "images/industry.jpeg",
  "images/snail.jpeg",
  "images/books.jpeg",
  "images/pills.jpeg",
];

const Quiz = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(30);
  const answerRef = useRef();
  const { setUpdate } = useContext(LeaderboardContext);
  useEffect(() => {
    localStorage.setItem("quizScore", 0);
  }, []);
  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify([]));
  }, []);
  useEffect(() => {
    setStartTime(new Date());
    setTimer(30);
  }, [currentIndex]);

  const calculateScore = () => {
    const data = JSON.parse(localStorage.getItem("quizAnswers"));
    let counter = 0;
    try {
      data.map((question) => {
        if (parseInt(question.answer) == question.correctAnswer) counter++;
      });
    } catch (error) {
      console.log(error);
    }
    return counter * 10;
  };
  const handleNext = () => {
    const newAnswer = answerRef.current.value;
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000; // Duration in seconds
    if (newAnswer) {
      localStorage.setItem(
        "quizAnswers",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("quizAnswers")),
          {
            question: questions[currentIndex].text,
            correctAnswer: questions[currentIndex].correctAnswer,
            answer: newAnswer,
            duration: duration,
          },
        ])
      );
      localStorage.setItem("quizScore", calculateScore());
      setUpdate((prev) => !prev);
    }

    if (currentIndex === questions.length - 1) {
      onNext();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    answerRef.current.value = "";
    setButtonDisabled(true);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      style={{ minHeight: "90vh", padding: "0px" }}
    >
      <Grid item>
        <Card style={{ transform: "scaleY(0.9)" }}>
          <CardContent>
            {questions[currentIndex].text.split(".").map((line, index) => (
              <Typography
                variant="h4"
                sx={{ textAlign: "right" }}
                key={JSON.stringify(line)}
              >
                {index == questions[currentIndex].text.split(".").length - 1
                  ? "?"
                  : ""}
                {line}
              </Typography>
            ))}
          </CardContent>
          <CardMedia
            component="img"
            image={IMAGES[currentIndex]}
            alt="quiz"
            style={{
              width: "50%",
              height: "auto",
              borderRadius: "4px",
              paddingLeft: "25%",
            }}
          />
          <CardContent>
            <Select
              inputRef={answerRef}
              onChange={(e) => {
                setButtonDisabled(e.target.value === "");
              }}
              label="Answer"
              variant="outlined"
              fullWidth
              dir="rtl"
              native
            >
              <option value="" />
              {[...Array(201).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>
          </CardContent>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                onClick={handleNext}
                disabled={buttonDisabled}
                variant="contained"
                color="primary"
              >
                Next
              </Button>
              <CountDown
                time={timer}
                onCountdownEnd={handleNext}
                currentIndex={currentIndex}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Quiz;
