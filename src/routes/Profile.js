import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../color";
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
    <StyledProfile>
      <div className="editForm">
        <form onSubmit={onSubmitProfile}>
          <input
            type="text"
            placeholder="Display Name"
            onChange={onChangeProfile}
            value={displayName}
            className="editProfileInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="editProfileSubmit"
          />
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
      </div>
    </StyledProfile>
  );
};
export default Profile;

const StyledProfile = styled.div`
  display: inline-block;
  width: 100%;
  height: 80vh;
  justify-content: center;
  padding-top: 10px;
  text-align: center;

  .editForm {
    display: inline-block;
    width: 30vw;
    background-color: white;
    border-radius: 10px;

    form {
      text-align: center;

      input {
        width: 25vw;
        border-radius: 20px;
        margin-top: 10px;
      }
    }
    button {
      width: 25vw;
      height: 4vh;
      border: none;
      border-radius: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
      background-color: ${theme.pink};
      cursor: pointer;
    }
  }
  .editProfileInput {
    height: 5vh;
    background-color: ${theme.beige};
    border: 1px solid ${theme.red};
    border-radius: 20px;
    text-align: center;
  }
  .editProfileSubmit {
    height: 4vh;
    background-color: ${theme.bg};
    border: none;
    cursor: pointer;
    margin-bottom: 5vh;
  }
`;
