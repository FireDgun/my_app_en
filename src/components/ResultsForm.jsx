import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, Select, MenuItem } from "@mui/material";
import firebase from ".././firebase"; // Import firebase
const generateInitialState = (games) => {
  const initialState = {};
  let saveGusses = JSON.parse(localStorage.getItem("userGuesses"));
  if (!saveGusses) saveGusses = [];
  games.forEach((game) => {
    if (saveGusses[`${game.id}-home`] || saveGusses[`${game.id}-home`] === 0) {
      initialState[`${game.id}-home`] = saveGusses[`${game.id}-home`];
    } else {
      initialState[`${game.id}-home`] = "";
    }
    if (saveGusses[`${game.id}-away`] || saveGusses[`${game.id}-away`] === 0) {
      initialState[`${game.id}-away`] = saveGusses[`${game.id}-away`];
    } else {
      initialState[`${game.id}-away`] = "";
    }
  });

  return initialState;
};
function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const ResultsForm = ({ games1, onNext }) => {
  const [userResults, setUserResults] = useState(generateInitialState(games1));
  const [games, setGames] = useState([]);
  useEffect(() => {
    setGames(shuffleArray(games1));
  }, []);
  const handleChange = (id, type, value) => {
    setUserResults((prev) => {
      localStorage.setItem(
        "userGuesses",
        JSON.stringify({
          ...prev,
          [`${id}-${type}`]: parseInt(value) || 0,
        })
      );
      return {
        ...prev,
        [`${id}-${type}`]: parseInt(value) || 0,
      };
    });
  };

  const saveToFirestore = (data) => {
    const db = firebase.firestore();
    db.collection("results")
      .add(data)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleSubmit = () => {
    let correctGuesses = parseInt(localStorage.getItem("quizScore"));
    games.forEach((game) => {
      const homeScore = parseInt(userResults[`${game.id}-home`], 10);
      const awayScore = parseInt(userResults[`${game.id}-away`], 10);

      if (game.homeScore === homeScore && game.awayScore === awayScore) {
        correctGuesses += 10;
      } else if (
        (game.homeScore > game.awayScore && homeScore > awayScore) ||
        (game.homeScore < game.awayScore && homeScore < awayScore) ||
        (game.homeScore === game.awayScore && homeScore === awayScore)
      ) {
        correctGuesses += 5;
      }
    });

    // Get the data from the localStorage
    const storedQuizAnswers = JSON.parse(localStorage.getItem("quizAnswers"));
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    const normalizedGames = games.map((game) => {
      const userGuesHomeScore = userResults[`${game.id}-home`];
      const userGuesAwayScore = userResults[`${game.id}-away`];
      return { ...game, userGuesHomeScore, userGuesAwayScore };
    });
    // Save the data to Firestore
    saveToFirestore({
      normalizedGames,
      correctGuesses,
      quizAnswers: storedQuizAnswers,
      userDetails: storedUserDetails,
    });
    onNext();
  };
  const isFormComplete = () => {
    return Object.values(userResults).every((value) => value !== "");
  };
  return (
    <Grid container style={{ minHeight: "90vh", padding: "0px" }}>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        container
        direction="column"
        alignItems="center"
      >
        <Typography variant="h6">
          Enter the results of the games according to what you remember
        </Typography>
        <br />
        {games.map((game) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="end"
            key={JSON.stringify(game)}
            style={{ marginTop: "16px" }}
          >
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Typography variant="body1">{game.homeTeam}</Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Select
                label="Home Score"
                variant="outlined"
                style={{ width: "50px" }}
                onChange={(e) => handleChange(game.id, "home", e.target.value)}
                value={
                  userResults[`${game.id}-home`] === 0
                    ? 0
                    : userResults[`${game.id}-home`] || ""
                }
              >
                {[...Array(11).keys()].map((num) => (
                  <MenuItem value={num} key={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Typography variant="body">vs</Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Select
                label="Away Score"
                variant="outlined"
                style={{ width: "50px" }}
                onChange={(e) => handleChange(game.id, "away", e.target.value)}
                value={
                  userResults[`${game.id}-away`] === 0
                    ? 0
                    : userResults[`${game.id}-away`] || ""
                }
              >
                {[...Array(11).keys()].map((num) => (
                  <MenuItem value={num} key={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Typography variant="body1">{game.awayTeam}</Typography>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <br />
          <br />

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!isFormComplete()}
          >
            {isFormComplete()
              ? "OK"
              : "Results must be filled in for all groups"}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResultsForm;
