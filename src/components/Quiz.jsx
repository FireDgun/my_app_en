import React, { useRef, useState, useEffect, useContext } from "react";
import { Typography, Button, Box, Select } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import CountDown from "./CountDown";
import { LeaderboardContext } from "./LeaderboardProvider";

const questions = [
  {
    text: "You are in a race and you overtake the person in second place. What position in the race are you currently in?",
    correctAnswer: 2,
    id: 1,
  },
  {
    text: " How many cubic meters of sand are there in a pit measuring 3⋅3⋅3 ?",
    correctAnswer: 0,

    id: 2,
  },
  {
    text: "5 machines take 5 minutes to produce 5 products. How many minutes will it take 100 machines to produce 100 products?",
    correctAnswer: 5,

    id: 3,
  },
  {
    text: "A snail is found at the bottom of a well at a height of 30 meters. Every day it climbs up 3 meters, but every night it slides down 2 meters, how many days will it take a snail. climb out of the well?",
    correctAnswer: 28,
    id: 4,
  },
  {
    text: " There is a book on a shelf in the library. He is the third book from the right and the fifth from the left. How many books are there on the shelf?",
    correctAnswer: 7,
    id: 5,
  },
  {
    text: "If a doctor now recommends taking a pill every half hour. In how many minutes will you take 3 pills?",
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
      data.forEach((question) => {
        if (parseInt(question.answer) === question.correctAnswer) counter++;
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
              <Typography
                variant="h4"
              >
                {questions[currentIndex].text}
              </Typography>
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
