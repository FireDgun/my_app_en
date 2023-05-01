import { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebase";
import { collection, orderBy, getDocs, query } from "firebase/firestore";

export const LeaderboardContext = createContext();

export const useLeaderboard = () => useContext(LeaderboardContext);

const LeaderboardProvider = ({ children, step }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [updateMyScore, setUpdate] = useState(false);
  const [updateRank, setUpdateRank] = useState(false);

  useEffect(() => {
    if (step > 1 && step < 6) {
      const myData = {
        userDetails: { name: "you" },
        correctGuesses: localStorage.getItem("quizScore"),
        you: true,
        id: 11111111111111,
      };
      setAllUsers((prevUsers) =>
        [
          ...prevUsers.filter((item) => item?.userDetails?.name !== "you"),
          myData,
        ].sort(
          (a, b) => parseInt(b.correctGuesses) - parseInt(a.correctGuesses)
        )
      ); // Insert myData object into users array
    }
  }, [updateMyScore]);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(firebase.firestore(), "results"),
          orderBy("correctGuesses", "desc")
        )
      );
      setAllUsers((prevUsers) => [
        ...prevUsers,
        ...querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ]);
    };
    getUsers();
  }, []);

  useEffect(() => {
    setUsers(
      allUsers
        .map((user, index) => {
          if (index < 10)
            return {
              ...user,
              userDetails: { ...user.userDetails },
              rank: index + 1,
            };

          if (
            user?.you ||
            user.userDetails.email ===
              JSON.parse(localStorage.getItem("userDetails")).email
          )
            return {
              ...user,
              userDetails: { ...user.userDetails },
              rank: index + 1,
            };
          return null;
        })
        .filter((item) => item)
    );
  }, [updateRank, allUsers]);

  return (
    <LeaderboardContext.Provider
      value={{ users, setUpdate, setUsers, setUpdateRank, setAllUsers }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export default LeaderboardProvider;
