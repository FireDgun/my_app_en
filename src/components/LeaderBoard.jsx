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

  console.log(users);
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        אלוף האלופים
      </Typography>
      <Table sx={{ width: "70%" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>דירוג</TableCell>
            <TableCell sx={{ textAlign: "center" }}>שם</TableCell>
            <TableCell sx={{ textAlign: "center" }}>ניקוד</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
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
              <TableCell sx={{ textAlign: "center" }}>
                {user.userDetails.name}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {user.correctGuesses}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
