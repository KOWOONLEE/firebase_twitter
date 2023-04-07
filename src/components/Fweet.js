import React, { useState } from "react";
import Heart from "./Heart";
import styled from "styled-components";
import { theme } from "../color";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { dbService, storageService } from "../myBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const Fweet = ({ userObj, fweetObj, isOwner, heartCount, setHeartCount }) => {
  const [editing, setEditing] = useState(false);
  const [editedFweet, setEditedFweet] = useState(fweetObj.text);
  const FweetTextRef = doc(dbService, "fweets", `${fweetObj.id}`);

  // console.log(fweetObj, editedFweet);

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await deleteDoc(FweetTextRef);
      await deleteObject(ref(storageService, fweetObj.fileUrl));
    }
  };

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await updateDoc(FweetTextRef, {
      text: editedFweet,
      userName: userObj.displayName,
    });
    setEditing(false);
  };
  const editFweet = (event) => {
    const {
      target: { value },
    } = event;
    setEditedFweet(value);
  };
  return (
    <StyledFweet>
      <div>
        {editing ? (
          <div className="editFweet">
            <form onSubmit={submitEdit}>
              <input
                type="text"
                placeholder="Edit your Fweet"
                value={editedFweet}
                required
                onChange={editFweet}
                className="editTextInput"
              />
              <input type="submit" value="Update" className="editTextSubmit" />
            </form>
            <button onClick={handleEdit}>Cancel</button>
          </div>
        ) : (
          <div>
            <div className="heartWrap">
              {/* <Heart
                fweetObj={fweetObj}
                heartCount={heartCount}
                setHeartCount={setHeartCount}
              /> */}
            </div>
            <div className="fweetText">
              <div className="textWrap">
                <div className="userName">by {fweetObj.userName}</div>
                <div className="text">
                  <p>{fweetObj.text}</p>
                </div>
                {fweetObj.fileUrl && (
                  <img
                    src={fweetObj.fileUrl}
                    alt="attachmentImg"
                    width="150px"
                    height="200px"
                  />
                )}
                <div className="date">
                  {new Date(fweetObj.createdAt).getFullYear()}/
                  {new Date(fweetObj.createdAt).getMonth() + 1}/
                  {new Date(fweetObj.createdAt).getDate()}
                  {""} {""}
                  {new Date(fweetObj.createdAt).getHours()}:
                  {new Date(fweetObj.createdAt).getMinutes()}
                </div>
              </div>
              {isOwner && (
                <div className="buttonWrap">
                  <button onClick={handleDelete}>
                    <BsTrash3 />
                  </button>
                  <button onClick={handleEdit}>
                    <AiOutlineEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </StyledFweet>
  );
};
export default Fweet;

const StyledFweet = styled.div`
  margin-top: 2vh;
  margin-bottom: 3vh;

  .editFweet {
    display: inline-block;
    width: 30vw;
    background-color: white;
    border-radius: 10px;
    justify-content: center;
    vertical-align: center;
    align-items: center;
    text-align: center;

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
      height: 3vh;
      border: none;
      border-radius: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
      background-color: ${theme.pink};
      cursor: pointer;
    }
  }
  .editTextInput {
    height: 5vh;
    background-color: ${theme.beige};
    border: 1px solid ${theme.red};
    border-radius: 20px;
    text-align: center;
  }
  .editTextSubmit {
    height: 3vh;
    background-color: ${theme.pink};
    border: none;
    cursor: pointer;
  }

  .heartWrap {
    display: flex;
    justify-content: end;
    align-items: center;
  }

  .fweetText {
    display: flex;
    width: 30vw;
    vertical-align: center;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    border: 2px solid ${theme.red};
    box-shadow: 3px 3px 3px ${theme.red};
  }
  .textWrap {
    /* display: inline-block; */
    float: left;
    width: 22vw;

    p {
      text-align: left;
      /* align-items: left; */
      padding: 3px;
      color: black;
      font-weight: 600;
    }
    img {
      margin-bottom: 10px;
    }
  }
  .userName {
    margin-top: 10px;
  }
  .text {
    display: flex;
    justify-content: space-around;

    svg {
      width: 2.5vw;
      height: 2.5vh;
    }
  }
  .buttonWrap {
    display: flex;
    width: 5vw;

    button {
      width: 3vw;
      height: 3vh;
      border: none;
      background-color: white;
      cursor: pointer;

      svg {
        width: 2vw;
        height: 2vh;
        fill: ${theme.red};
      }
    }
  }
  .date {
    margin-bottom: 10px;
    font-size: 0.9em;
    text-align: center;
  }
`;
