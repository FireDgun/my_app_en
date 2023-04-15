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
      email: "",
      favTeam: "",
    };
  });

  const handleUserDetailsChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
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
        <Typography variant="h4">!שלום רב, ברוך הבא לשאלון שלנו</Typography>
      </Grid>
      <Grid item sx={{ textAlign: "center" }}>
        <Typography variant="body1">הכנס את הפרטים שלך</Typography>
      </Grid>
      <Grid item>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <TextField
            label="כינוי"
            variant="outlined"
            required
            onChange={(e) => handleUserDetailsChange("name", e.target.value)}
          />
          <TextField
            label="אימייל"
            type="email"
            required
            variant="outlined"
            onChange={(e) => handleUserDetailsChange("email", e.target.value)}
          />
        </Box>
      </Grid>

      <Grid item>
        <TextField
          label="קבוצת כדורגל מועדפת מישראל"
          fullWidth
          variant="outlined"
          onChange={(e) => handleUserDetailsChange("favTeam", e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={
            userDetails.email == "" || userDetails.name == "" ? true : false
          }
        >
          הבא
        </Button>
      </Grid>
    </Grid>
  );
};

export default DetailsEntry;
