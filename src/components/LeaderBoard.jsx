import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { LeaderboardContext } from "./LeaderboardProvider";

const Leaderboard = () => {
  const { users } = useContext(LeaderboardContext);

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Leader Board
      </Typography>
      <Table sx={{ width: "70%" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Rank</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((user, index) => {
  const isHebrew = /[א-ת]/.test(user.userDetails.name); // Check if name includes Hebrew letters
  const displayName = isHebrew ? `user ${index}` : user.userDetails.name; // Set display name accordingly

  return (
    <TableRow
      key={user.id}
      sx={{
        backgroundColor:
          user?.you ||
          user.userDetails.email ===
            JSON.parse(localStorage.getItem("userDetails")).email
            ? "yellow"
            : "transparent",
      }}
    >
      <TableCell sx={{ textAlign: "center" }}>{user.rank}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{displayName}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{user.correctGuesses}</TableCell>
    </TableRow>
  );
})}

        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
