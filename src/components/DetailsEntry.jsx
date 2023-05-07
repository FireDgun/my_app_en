import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box, Grid } from "@mui/material";

const DetailsEntry = ({ onNext }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const data = localStorage.getItem("userDetails");
    if (data) {
      return JSON.parse(data);
    }
    return {
      name: "",
      email: "english@version.com",
      favTeam: "",
    };
  });
  const [emailError, setEmailError] = useState(false);

  const handleUserDetailsChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };
  const validateEmail = (email) => {
    // A simple email validation regex
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    handleUserDetailsChange("email", email);
    setEmailError(!validateEmail(email));
  };
  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      style={{ minHeight: "90vh", padding: "32px" }}
    >
      <Grid item>
        <Typography variant="h4">
          Hello, welcome to our questionnaire
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          Questionnaire length: about 5 minutes
        </Typography>
      </Grid>
      <Grid item sx={{ textAlign: "center" }}>
        <Typography variant="body1">Enter your details</Typography>
      </Grid>
      <Grid item>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <TextField
            label="nick name"
            variant="outlined"
            required
            onChange={(e) => handleUserDetailsChange("name", e.target.value)}
          />

          {/* <TextField
            label="email"
            type="email"
            required
            variant="outlined"
            error={emailError}
            helperText={emailError && "Please enter a valid email address"}
            onChange={handleEmailChange}
          /> */}
        </Box>
      </Grid>

      <Grid item>
        <TextField
          label="If you are a fan of a particular football team, mention it here"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          InputLabelProps={{
            style: {
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            },
          }}
          onChange={(e) => handleUserDetailsChange("favTeam", e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={userDetails.name === "" ? true : false}
        >
          next
        </Button>
      </Grid>
    </Grid>
  );
};

export default DetailsEntry;
