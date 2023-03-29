import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../color";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { dbService, storageService } from "../myBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const Fweet = ({ fweetObj, isOwner }) => {
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
          <div className="fweetText">
            <div className="textWrap">
              <p>{fweetObj.text}</p>
              {/* <p>{fweetObj.id}</p> */}
              {fweetObj.fileUrl && (
                <img
                  src={fweetObj.fileUrl}
                  alt="attachmentImg"
                  width="100px"
                  height="100px"
                />
              )}
            </div>
            {isOwner && (
              <div>
                <button onClick={handleDelete}>
                  <BsTrash3 />
                </button>
                <button onClick={handleEdit}>
                  <AiOutlineEdit />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </StyledFweet>
  );
};
export default Fweet;

const StyledFweet = styled.div`
  margin-top: 3vh;
  margin-bottom: 3vh;
  text-align: center;

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
  .fweetText {
    display: flex;
    width: 30vw;
    vertical-align: center;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    border: 2px solid ${theme.red};

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
  .textWrap {
    display: inline-block;

    p {
      width: 20vw;
      text-align: left;
      align-items: center;
      padding: 3px;
      color: black;
    }
  }
`;
