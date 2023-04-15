import React, { useState } from "react";
import { Button, Typography, Grid, Select, MenuItem } from "@mui/material";
import firebase from ".././firebase"; // Import firebase

const ResultsForm = ({ games, onNext }) => {
  const [userResults, setUserResults] = useState({});

  const handleChange = (id, type, value) => {
    setUserResults({
      ...userResults,
      [`${id}-${type}`]: parseInt(value, 10) || 0,
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

  return (
    <Grid
      container
      style={{ minHeight: "90vh", padding: "0px", textAlign: "right" }}
    >
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
          הכנס את תוצאות המשחקים על פי מה שאת/ה זוכר/ת
        </Typography>
        <br />
        {games.map((game) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="end"
            key={game.id}
            style={{ marginTop: "16px" }}
          >
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Typography variant="body">{game.homeTeam}</Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Select
                label="Home Score"
                variant="outlined"
                style={{ width: "50px" }}
                onChange={(e) => handleChange(game.id, "home", e.target.value)}
                inputProps={{
                  name: "home-score",
                  id: "home-score",
                }}
              >
                {[...Array(11).keys()].map((num) => (
                  <MenuItem value={num}>{num}</MenuItem>
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
                inputProps={{
                  name: "away-score",
                  id: "away-score",
                }}
              >
                {[...Array(11).keys()].map((num) => (
                  <MenuItem value={num}>{num}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Typography variant="body">{game.awayTeam}</Typography>
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
            disabled={Object.keys(userResults).length < 18}
          >
            OK
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResultsForm;
