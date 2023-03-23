import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dbService } from "../myBase";
import { collection, where, query, getDocs, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const [displayName, setDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    auth.signOut();
    navigate("/");
  };

  const getMyFweets = async () => {
    // const fweets = collection(dbService, "fweets").where(
    //   "creatorId",
    //   "==",
    //   userObj.uid
    // );
    const q = query(
      collection(dbService, "fweets"),
      where("creatorId", "==", `${userObj.uid}`)
      // orderBy("createdAt")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyFweets();
  }, []);

  const onChangeProfile = (event) => {
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  };

  const onSubmitProfile = async (event) => {
    event.preventDefault();
    if (displayName !== userObj.displayName) {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmitProfile}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChangeProfile}
          value={displayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
